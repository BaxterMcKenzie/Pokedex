import React from 'react';
import PokeballAnimation from '../animation/PokeballRoll';

const Header = () => {
  return (
    <div className='header'>
      <div className='title-container'>
        <div className='title'>Pokedex 151</div>
        <div className='title-overlay'>Pokedex 151</div>
        <div className='pokeball'>
        <PokeballAnimation />
      </div>
      </div>
    </div>
  );
};

export default Header;
