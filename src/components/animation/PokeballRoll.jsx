import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pokeballImage from '/img/pokeball.svg';

const PokeballAnimation = () => {
  const pokeballRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, ease: 'power1.inOut' });

timeline.to(pokeballRef.current, {
  duration: 0.3,
  x: 60,
  y: -40,
  rotation: 90,
  ease: 'power2.out',
})
.to(pokeballRef.current, {
  duration: 0.3,
  x: 120,
  y: 0,
  rotation: 150,
  ease: 'power2.in',
})
.to(pokeballRef.current, {
  duration: 0.4,
  x: 180,
  y: -30,
  rotation: 210,
  ease: 'power2.out', 
})
.to(pokeballRef.current, {
  duration: 0.3,
  x: 240,
  y: 0,
  rotation: 270,
  ease: 'power2.in',
})
.to(pokeballRef.current, {
  duration: 0.3,
  x: 280,
  y: -15,
  rotation: 300,
  ease: 'power2.out',
})
.to(pokeballRef.current, {
  duration: 0.2,
  x: 300,
  y: 0,
  rotation: 330,
  ease: 'power2.in',
})

.to(pokeballRef.current, {
  duration: 0.15,
  x: 300,
  y: 0,
  rotation: 350,
  ease: 'power1.out',
})
.to(pokeballRef.current, {
  duration: 0.15,
  x: 300,
  y: 0,
  rotation: 340,
  ease: 'power1.inOut',
})
.to(pokeballRef.current, {
  duration: 0.15,
  x: 300,
  y: 0,
  rotation: 350,
  ease: 'power1.out',
})
.to(pokeballRef.current, {
  duration: 0.15,
  x: 300,
  y: 0,
  rotation: 340,
  ease: 'power1.inOut',
})
.to(pokeballRef.current, {
  duration: 0.15,
  x: 300,
  y: 0,
  rotation: 350,
  ease: 'power1.out',
})
.to(pokeballRef.current, {
  duration: 1,
  x: 0,
  y: 0,
  rotation: 0,
  ease: 'power1.inOut',
});
  }, []);

  return (
    <img
      ref={pokeballRef}
      src={pokeballImage}
      alt="pokeball"
      style={{ width: '20px', height: '20px' }}
    />
  );
};

export default PokeballAnimation;