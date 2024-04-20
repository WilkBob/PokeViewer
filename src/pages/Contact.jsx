import React from 'react';
import { Typography, Link, TextField, Button, Box, Card, CardContent } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Contact = () => {
  return (
    <Card className='glass text-light' sx={{marginTop: '40px'}}>
      <CardContent>
        <Typography variant="h4">Contact Us</Typography>
        <Typography variant="body1">Email: <Link href="mailto:bob.wilkinson.guitarist@gmail.com">bob.wilkinson.guitarist@gmail.com</Link></Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1, my: 2 }}>
          <GitHubIcon />
          <Link href="https://github.com/yourusername" target="_blank">GitHub</Link>
        </Box>
        
      </CardContent>
    </Card>
  );
};

export default Contact;
