import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material'
import React from 'react'
import PokeScroller from '../components/PokeScroller'

const Home = () => {
  return (
    <div className='glass home'>
        
        <Container>
            <Typography variant="h2" align='center' className='text-light'>Poke Viewer</Typography>
            <Card>
                <CardContent>
                    <Typography variant="h3" align='center'>Welcome to the Pokédex</Typography>
                    <Typography variant="body1" align='center'>Browse through all 151 original Pokémon</Typography>
                    <Typography variant="body1" align='center'>Click on a Pokémon to see more details, or..</Typography>
                    <Button variant='contained' fullWidth sx={{marginTop: '10px'}} href='/List'>View All Pokemon</Button>
                </CardContent>
            </Card>
        </Container>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} minHeight={'500px'}>
            <PokeScroller />
        </Box>
    </div> 
  )
}

export default Home
