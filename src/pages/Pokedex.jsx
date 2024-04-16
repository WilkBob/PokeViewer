import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { get151Pokemon} from '../API/pokemon';
import PokedexCard from '../components/PokeDexCard';

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await get151Pokemon();
      setPokemonData(data);
    };

    fetchPokemon();
  }, []);

  return (
    <>
      <Typography variant="h4" align="center">Pokedex</Typography>
      <Grid container spacing={2}>
        {pokemonData.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <PokedexCard pokemon = {pokemon}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Pokedex;
