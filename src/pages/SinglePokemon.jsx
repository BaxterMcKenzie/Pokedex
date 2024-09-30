import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokeContext } from '../context/PokeContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

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

const nameNumberColors = {
  normal: 'rgb(255, 255, 150)', // Neon Yellow
  fire: 'rgb(255, 170, 40)', // Neon Orange
  water: 'rgb(0, 255, 255)', // Neon Cyan
  grass: 'rgb(0, 255, 100)', // Neon Green
  electric: 'rgb(255, 255, 0)', // Neon Yellow
  ice: 'rgb(150, 255, 255)', // Neon Light Blue
  fighting: 'rgb(255, 0, 0)', // Neon Red
  poison: 'rgb(200, 0, 255)', // Neon Purple
  ground: 'rgb(255, 210, 50)', // Neon Gold
  flying: 'rgb(100, 200, 255)', // Neon Sky Blue
  psychic: 'rgb(255, 0, 150)', // Neon Pink
  bug: 'rgb(170, 255, 0)', // Neon Lime
  rock: 'rgb(255, 200, 0)', // Neon Yellow-Orange
  ghost: 'rgb(150, 0, 255)', // Neon Violet
  dragon: 'rgb(120, 0, 255)', // Neon Deep Purple
  dark: 'rgb(50, 50, 50)', // Dark Gray with slight neon sheen
  steel: 'rgb(150, 150, 255)', // Neon Light Steel
  fairy: 'rgb(255, 100, 180)', // Neon Pinkish Red
};

// Utility function to darken colors
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

const SinglePokemon = () => {
  const { selectedPokemon } = useContext(PokeContext);
  const navigate = useNavigate();

  if (!selectedPokemon || !selectedPokemon.officialArtworkURL) {
    return <p>No Pokémon selected!</p>;
  }

  const primaryType = selectedPokemon.types[0].toLowerCase();
  const showdownImageURL = `https://play.pokemonshowdown.com/sprites/ani/${selectedPokemon.name.toLowerCase()}.gif`;

  // Function to play sound
  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  return (
    <div>
      <div className='search-type-container'></div>

      <div className='single-pokemon' style={{ backgroundColor: typeColors[primaryType] }}>
        <button className='back' onClick={() => navigate(-1)}>Go Back</button>

        {/* Left Container: Official Artwork */}
        <div className='left-container'>
          <div
            className='name-number'
            style={{
              backgroundColor: darkenColor(typeColors[primaryType], -40),
              color: nameNumberColors[primaryType],
              borderBottom: `4px solid ${nameNumberColors[primaryType]}`,
              padding: '10px',
            }}
          >
            <h1>{selectedPokemon.name.toUpperCase()}</h1>
            <h1 id='poke-id'>#{selectedPokemon.id}</h1>
          </div>
          <img src={selectedPokemon.officialArtworkURL} alt={`${selectedPokemon.name} image`} />
        </div>

        {/* Right Container: Showdown Sprite and Details */}
        <div className='right-container'>
          <div
            className='name-number'
            style={{
              backgroundColor: darkenColor(typeColors[primaryType], -40),
              color: nameNumberColors[primaryType],
              borderBottom: `4px solid ${nameNumberColors[primaryType]}`,
              padding: '10px',
            }}
          >
            <h1>Abilities & Stats</h1>
          </div>
          <div className='right-container-details'>
            <div className='pokemon-sprite-container'>
              <img src={showdownImageURL} alt={`${selectedPokemon.name} sprite`} />
            </div>
            <p>Type: {selectedPokemon.types.join(", ")}</p>
            <p>Ability: {selectedPokemon.ability.join(", ")}</p>
            <p>Height: {selectedPokemon.height * 10} cm</p>
            <p>Weight: {(selectedPokemon.weight / 10).toFixed(1)} kg</p>

            {/* Display Stats */}
            <p>HP: {selectedPokemon.stats.find(stat => stat.name === 'hp').value}</p>
            <p>Attack: {selectedPokemon.stats.find(stat => stat.name === 'attack').value}</p>
            <p>Defense: {selectedPokemon.stats.find(stat => stat.name === 'defense').value}</p>
            <p>Special Attack: {selectedPokemon.stats.find(stat => stat.name === 'special-attack').value}</p>
            <p>Special Defense: {selectedPokemon.stats.find(stat => stat.name === 'special-defense').value}</p>
            <p>Speed: {selectedPokemon.stats.find(stat => stat.name === 'speed').value}</p>
            <p>Base Experience: {selectedPokemon.baseExperience}</p>

            {/* Display Moves */}
            <p>Moves: {selectedPokemon.moves.join(', ')}</p>
          </div>

          <div className='sounds'>
            {/* Add buttons for cries */}
            <button className='button' onClick={() => playSound(selectedPokemon.cries.latest)}>
            <FontAwesomeIcon icon={faVolumeUp} /> Play Latest Cry
            </button>
            <button className='button' onClick={() => playSound(selectedPokemon.cries.legacy)}>
            <FontAwesomeIcon icon={faVolumeUp} />Play Legacy Cry 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SinglePokemon;
