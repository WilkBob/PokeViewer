import React, { useEffect, useState, useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, MoreHorizOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getImageUrl, getPokemonById } from '../API/pokemon'; // import toggleFavorite
import { UserContext } from '../context/UserContext';
import { getFavorites, toggleFavorite } from '../API/firedb';

const PokeCard = ({ id, position }) => {
  const [pokemon, setPokemon] = useState(null);
  const [favorites, setFavorites] = useState({});
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPokemonById(id).then((data) => {
        setPokemon(data);
      });
    } else {
      setPokemon(null);
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      getFavorites(user.uid).then((data) => {
        setFavorites(data || {});
      });
    }
  }, [user, id]);

  const isFavorite = favorites.hasOwnProperty(id) ? favorites[id] : false;

 const handleFavoriteClick = () => {
  if (!user) {
    navigate('/login');
    return;
  }

  const newFavorites = { ...favorites };
  if (isFavorite) {
    delete newFavorites[id];
  } else {
    newFavorites[id] = true;
  }
  setFavorites(newFavorites);
  toggleFavorite(user.uid, id);
};

  const className = `PokeCard position-${position}`;

  if (!pokemon) return null;

  return (
    <div className={`poke-card ${className} glass text-light`}>
      <div className='poke-card-media'>
        <img
          onClick={() => navigate(`/pokemon/${id}`)}
          height='200'
          src={getImageUrl(id)}
          alt={pokemon.name}
        />
      </div>
      <div className='poke-card-content'>
        <h2>{pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)} 
        <IconButton onClick={handleFavoriteClick}>
          <FavoriteIcon color={isFavorite ? 'secondary' : 'default'} />
        </IconButton>
        </h2>
        <p>#{id.toString().padStart(3, '0')}</p>
        
        <Button sx={{marginBottom: '5px'}} onClick={() => navigate(`/pokemon/${id}`)} startIcon={<MoreHorizOutlined/>}>
          Details
        </Button>
        
      </div>
    </div>
  );
};

export default PokeCard;