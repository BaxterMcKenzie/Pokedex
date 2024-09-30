import { createContext, useState } from "react";

export const PokeContext = createContext();

export const PokeContextProvider = ({ children }) => {
  // Define a state that stores the full Pokémon object with all necessary details
  const [selectedPokemon, setSelectedPokemon] = useState({
    id: null,
    name: '',
    showdownImageURL: '',
    officialArtworkURL: '',
    types: [],
    abilities: [], // Change to plural for multiple abilities
    moves: [],     // New field for moves
    height: 0,
    weight: 0,
    stats: [],     // New field for stats
  });

  return (
    <PokeContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      {children}
    </PokeContext.Provider>
  );
};
