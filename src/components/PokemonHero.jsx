import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip, IconButton, List, ListItem, ListItemText, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { getPokemonById, getImageUrl, getPokemonDescriptionFromSpecies } from '../API/pokemon';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../API/firedb';
import './PokemonHero.css';
import { PlayArrow } from '@mui/icons-material';


function PokemonHero({ id }) {
    const { user } = useContext(UserContext);
    const [favorite, setFavorite] = useState( false);
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (id >= 1 && id <= 151) {
            getPokemonById(id).then((data) => {
                setPokemon(data);
                setLoading(false);
                console.log(data)
            }).catch((error) => {
                setError('Error fetching Pokemon');
                setLoading(false);
                console.log('favorite:', Favorite);
            });
            getPokemonDescriptionFromSpecies(id).then((data) => {
                setDescription(data);
            });

        } else {
            setError('Invalid Pokemon ID');
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (user) {
            isFavorite(user.uid, id).then((result) => {
                setFavorite(result);
            });
        }
    }, [user, id]);


const handleFavoriteClick = () => {
    if (user) {
        toggleFavorite(user.uid, id).then(() => {
            if (favorite) {
                setFavorite(false);
            } else {
                setFavorite(true);
            }
        });
    } else {
        navigate('/login');
    }
};

const capitalizeAndParseGender = (name) => {
    if(!name) return '';
    if(name.includes('r-')) {
      //replace r- with 'r. ', this is for Mr. Mime
      return name.charAt(0).toUpperCase() + name.slice(1).replace('r-m', 'r. M');
    } else
    if (name.includes('-f')) {
      return name.charAt(0).toUpperCase() + name.slice(1).replace('-f', '\u2640');
    } else if (name.includes('-m')) {
      return name.charAt(0).toUpperCase() + name.slice(1).replace('-m', '\u2642');
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };




    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='pokemon-hero glass text-light'>
            <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
            </IconButton>
            <img src={getImageUrl(id)} alt={pokemon.name} className='pokemon-image' />
            <div className='pokemon-info'>
                <Typography variant='h4' className='pokemon-name'>{capitalizeAndParseGender(pokemon.name)}
                    <IconButton onClick={handleFavoriteClick}>
                        <FavoriteIcon color={favorite ? 'secondary' : 'default'} />
                    </IconButton>
                </Typography>
                <div className='pokemon-types'>
                    {pokemon.types.map((type, index) => (
                        <Chip
                            sx={{ translate: `${index * 20}px, 0px`, textShadow: '0px 0px 5px black' }}
                            key={index}
                            label={type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                            className={type.type.name}
                        >
                        </Chip>
                    ))}
                </div>

                <Typography variant='body1' className='pokemon-description'>{description}</Typography>

                <div className="pokemon-details">
                    <List>
                        <ListItem>
                            <ListItemText primary={`Height: ${pokemon.height}0cm`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Weight: ${pokemon.weight}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Base Experience: ${pokemon.base_experience}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`${capitalizeAndParseGender(pokemon.name)}'s Cry:`} />
                            <audio src={pokemon.cries.latest}></audio>
                            <IconButton onClick={() => document.querySelector('audio').play()}>
                                <PlayArrow />
                            </IconButton>

                            <VolumeUp />

                            <Slider onChange={(e, value) => document.querySelector('audio').volume = value} defaultValue={0.5} step={0.01} max={1} min={0} />
                        </ListItem>
                    </List>
                </div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Moves</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ overflowY: 'scroll', height: '200px' }}>
                        {pokemon.moves.map((move, index) => (
                            <Chip variant='outlined' sx={{ margin: '2px' }} key={index} label={move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)} />
                        ))}
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}

export default PokemonHero;