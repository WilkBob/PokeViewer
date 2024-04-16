import React from 'react'
import { useParams } from 'react-router-dom';
import PokemonHero from '../components/PokemonHero';

const Pokemon = () => {

    const id = useParams().id;
  return (
    <div>
      <PokemonHero id={id}/>
    </div>
  )
}

export default Pokemon
