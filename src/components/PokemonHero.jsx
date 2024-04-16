import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip, IconButton, List, ListItem, ListItemText, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPokemonById, getImageUrl } from '../API/pokemon';
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
                <Typography variant='h4' className='pokemon-name'>{pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)}</Typography>
                <div className='pokemon-types'>
                    {pokemon.types.map((type, index) => (
                        <Chip sx={{translate: `${index * 20}px, 0px`}} key={index} label={type.type.name} color={
                            type.type.name === 'grass' ? 'success' :
                            type.type.name === 'fire' ? 'error' :
                            type.type.name === 'water' ? 'info' :
                            type.type.name === 'bug' ? 'warning' :
                            type.type.name === 'normal' ? 'default' :
                            type.type.name === 'poison' ? 'secondary' :
                            type.type.name === 'electric' ? 'warning' :
                            type.type.name === 'ground' ? 'info' :
                            type.type.name === 'fairy' ? 'error' :
                            type.type.name === 'fighting' ? 'error' :
                            type.type.name === 'psychic' ? 'error' :
                            type.type.name === 'rock' ? 'info' :
                            type.type.name === 'ghost' ? 'error' :
                            type.type.name === 'ice' ? 'info' :
                            type.type.name === 'dragon' ? 'error' :
                            type.type.name === 'dark' ? 'error' :
                            type.type.name === 'steel' ? 'info' :
                            type.type.name === 'flying' ? 'info' : 'default'
                        }>
                        </Chip>
                    ))}
                </div>
                <div className='favorite-button'>
                <IconButton onClick={handleFavoriteClick}>
                    <FavoriteIcon color={favorite ? 'secondary' : 'default'} />
                </IconButton>
                </div>
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
                        
                            <ListItemText primary={`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}'s Cry:`}/>
                            <audio src={pokemon.cries.latest}></audio>
                            <IconButton onClick={() => document.querySelector('audio').play()}>
                                 <PlayArrow />
                            </IconButton>    
                               <Slider onChange={(e, value) => document.querySelector('audio').volume = value} defaultValue={0.5} step={0.01} max={1} min={0} />
                            
                       
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
                    <AccordionDetails sx={{overflowY: 'scroll', height: '200px'}}>
                        <Typography>
                            {pokemon.moves.map((move, index) => (
                                <Chip key={index} label={move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)} />
                            ))}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}

export default PokemonHero;