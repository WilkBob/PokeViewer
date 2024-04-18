import React from 'react'
import { useParams } from 'react-router-dom';
import PokemonHero from '../components/PokemonHero';

const Pokemon = () => {

    const id = useParams().id;
  return (
    <>
      <PokemonHero id={id}/>
    </>
  )
}

export default Pokemon
