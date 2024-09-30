import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PokeContext } from '../context/PokeContext';
import { useNavigate } from 'react-router-dom';

// Colors for each Pokémon type
const typeColors = {
  normal: '#B8B08D',
  fire: '#EACFB7',
  water: '#A0C1D1',
  grass: '#9EBF8F',
  electric: '#F2E77A',
  ice: '#A1D2D0',
  fighting: '#B63D3A',
  poison: '#B06DAB',
  ground: '#D6C689',
  flying: '#B69FEC',
  psychic: '#E2868B',
  bug: '#A7BD5B',
  rock: '#BDAF6E',
  ghost: '#8D7B9C',
  dragon: '#8574F8',
  dark: '#8D7B6F',
  steel: '#B9B9CC',
  fairy: '#E3AFC3',
};

// Neon colors for different Pokémon types
const nameNumberColors = {
  normal: 'rgb(255, 255, 150)',
  fire: 'rgb(255, 170, 40)',
  water: 'rgb(0, 255, 255)',
  grass: 'rgb(0, 255, 100)',
  electric: 'rgb(255, 255, 0)',
  ice: 'rgb(150, 255, 255)',
  fighting: 'rgb(255, 0, 0)',
  poison: 'rgb(200, 0, 255)',
  ground: 'rgb(255, 210, 50)',
  flying: 'rgb(100, 200, 255)',
  psychic: 'rgb(255, 0, 150)',
  bug: 'rgb(170, 255, 0)',
  rock: 'rgb(255, 200, 0)',
  ghost: 'rgb(150, 0, 255)',
  dragon: 'rgb(120, 0, 255)',
  dark: 'rgb(50, 50, 50)',
  steel: 'rgb(150, 150, 255)',
  fairy: 'rgb(255, 100, 180)',
};

// Utility function to darken a color
const darkenColor = (color, amount) => {
  let usePound = false;
  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }
  let num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  const newColor = (r < 255 ? r : 255) * 0x10000 + (g < 255 ? g : 255) * 0x100 + (b < 255 ? b : 255);
  return (usePound ? "#" : "") + newColor.toString(16).padStart(6, '0');
};

const Home = () => {
  const { setSelectedPokemon } = useContext(PokeContext);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonData = response.data.results;
  
      // Fetch detailed data for each Pokémon
      const detailedPokemonData = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const type = pokemonResponse.data.types.map((typeData) => typeData.type.name);
          const ability = pokemonResponse.data.abilities.map((abilityData) => abilityData.ability.name);
          const id = pokemonResponse.data.id;
  
          // Fetch cries for the current Pokémon by ID
          const criesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const cries = {
            latest: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
            legacy: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`,
          };
  
          // NEW LINES: Fetch moves and stats
          const moves = pokemonResponse.data.moves.map((moveData) => moveData.move.name).slice(0, 5); // Get first 5 moves
          const stats = pokemonResponse.data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat,
          }));
  
          return {
            id,
            name: pokemon.name,
            showdownImageURL: pokemonResponse.data.sprites.other['dream_world'].front_default || pokemonResponse.data.sprites.front_default,
            officialArtworkURL: pokemonResponse.data.sprites.other['official-artwork'].front_default,
            ability,
            types: type,
            height: pokemonResponse.data.height,
            weight: pokemonResponse.data.weight,
            moves, // NEW: Add moves to Pokémon data
            stats, // NEW: Add stats to Pokémon data
            cries, // NEW: Add cries to Pokémon data
          };
        })
      );
  
      const pokemons = detailedPokemonData.map((pokemon) => ({
        ...pokemon,
        onSelect: () =>
          setSelectedPokemon({
            id: pokemon.id,
            name: pokemon.name,
            showdownImageURL: pokemon.showdownImageURL,
            officialArtworkURL: pokemon.officialArtworkURL,
            types: pokemon.types,
            ability: pokemon.ability,
            height: pokemon.height,
            weight: pokemon.weight,
            moves: pokemon.moves, // NEW: Add moves to selected Pokémon
            stats: pokemon.stats, // NEW: Add stats to selected Pokémon
            cries: pokemon.cries, // NEW: Add cries to selected Pokémon
          }),
      }));
  
      setLoading(false);
      setPokedex(pokemons);
      setFilteredPokemon(pokemons);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    const filteredData = pokedex.filter((pokemon) => {
      const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = !type || pokemon.types.includes(type.toLowerCase());
      return nameMatch && typeMatch;
    });
    setFilteredPokemon(filteredData);
  }, [searchTerm, type, pokedex]);

  return (
    <div id='homepage'>
      <div className='margin'></div>

      <div className='search-type-container'>
        <div id='search-container'>
          <label htmlFor='search'>Search</label>
          <input
            type='text'
            name='search'
            id='search'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div id='type-container'>
          <label htmlFor='type'>Type</label>
          <select
            name='type'
            id='type'
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value=''>Choose Type...</option>
            {Object.keys(typeColors).map((typeKey) => (
              <option key={typeKey} value={typeKey}>
                {capitalizeFirstLetter(typeKey)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='card-holder'>
        <div className='pokemon-display-grid'>
          {loading ? (
            <img src='./img/dig.gif' alt='Loading' />
          ) : filteredPokemon.length === 0 ? (
            <p>No Pokémon Found</p>
          ) : (
            filteredPokemon.map((item, index) => (
              <div
                key={index}
                className='pokemon-card-wrapper'
                style={{
                  border: `6px solid ${nameNumberColors[item.types[0].toLowerCase()]}`,
                  borderRadius: '26px',
                  padding: '0px',
                }}
              >
                <div
                  className='pokemon-card'
                  style={{ backgroundColor: typeColors[item.types[0].toLowerCase()] }}
                  onClick={() => {
                    item.onSelect();
                    navigate('/pokemon/');
                  }}
                >
                  <div
                    className='name-number'
                    style={{ backgroundColor: darkenColor(typeColors[item.types[0].toLowerCase()], -40) }}
                  >
                    <h2 style={{ color: nameNumberColors[item.types[0].toLowerCase()] }}>
                      {capitalizeFirstLetter(item.name)}
                    </h2>
                    <h2 id='poke-id' style={{ color: nameNumberColors[item.types[0].toLowerCase()] }}>
                      <span>#{item.id}</span>
                    </h2>
                  </div>

                  <div
                    className='background-colour'
                    style={{
                      background: `linear-gradient(to top, ${darkenColor(typeColors[item.types[0].toLowerCase()], -40)}, rgba(255, 255, 255, 0))`,
                    }}
                  >
                    <div className='image-container'>
                      <img src={item.showdownImageURL} alt={item.name} />
                    </div>
                  </div>

                  <div className='pokemon-details' style={{ color: nameNumberColors[item.types[0].toLowerCase()] }}>
                    <h4>
                      Type: {item.types.map((type) => capitalizeFirstLetter(type)).join(' / ')}
                    </h4>
                    <p>Ability: {item.ability.join(', ')}</p>
                    <p>Height: {item.height * 10} cm</p>
                    <p>Weight: {(item.weight / 10).toFixed(1)} kg</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className='footer-margin'></div>
    </div>
  );
};

export default Home;
