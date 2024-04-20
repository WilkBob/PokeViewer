import { useState } from 'react';
import PokeCard from './PokeCard';
import './PokeScroller.css';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const PokeScroller = () => {
 
  const [id, setId] = useState(1);

  const handlePrevious = () => {
    setId(id > 1 ? id - 1 : 151);

  };

  const handleNext = () => {
    setId(id < 151 ? id + 1 : 1);
  };

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      handleNext();
    } else if (e.deltaY < 0) {
      handlePrevious();
    }
  };

  const prevId = id > 1 ? id - 1 : 151;
  const nextId = id < 151 ? id + 1 : 1;

  return (
    <>
      <IconButton onClick={handlePrevious}>
        <ArrowBack />
      </IconButton>
      <div className='PokeScroller' onWheel={handleScroll}>
        <PokeCard id={prevId} position={0}/>
        <PokeCard id={id} position={1} />
        <PokeCard id={nextId} position={2}/>
      </div>
      <IconButton onClick={handleNext}>
        <ArrowForward />
      </IconButton>
    </>
  );
};

export default PokeScroller;