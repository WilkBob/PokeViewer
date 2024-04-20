import { Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { getImageUrl, getPokemonByName } from '../API/pokemon';
import { useNavigate } from 'react-router-dom';

const PokeDexCard = ({pokemon}) => {
  const [pokeData, setPokeData] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    fetchPokemon();
  }, []);

  const capitalizeAndParseGender = (name) => {
    if(!name) return '';
    if (name.includes('-f')) {
      return name.charAt(0).toUpperCase() + name.slice(1).replace('-f', '\u2640');
    } else if (name.includes('-m')) {
      return name.charAt(0).toUpperCase() + name.slice(1).replace('-m', '\u2642');
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  const fetchPokemon = async () => {
    const data = await getPokemonByName(pokemon.name);
    setPokeData(data);
  };

  if (!pokeData) return null;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
      sx={{ height: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'contain'}}
        component="img"
        height="140"
        image={getImageUrl(pokeData.id)}
        alt={pokeData.name}
      />
      <CardActionArea onClick={()=>{
        navigate(`/pokemon/${pokeData.id}`);
      
      }}>
      <CardContent>
        <Typography variant="h6">#{pokeData.id} - {capitalizeAndParseGender(pokeData.name)} </Typography>
        <Typography variant="body2" color="text.secondary">
          {pokeData.types.map((type) => type.type.name).join(', ')}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokeDexCard;