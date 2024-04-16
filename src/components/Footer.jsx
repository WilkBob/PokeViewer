import React from 'react';
import { Typography, Link } from '@mui/material';


const Footer = () => {


  return (
    <footer className='footer'>
      <Typography variant="body2" color="textSecondary" align="center">
        Made with love by Bob
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="https://github.com/WilkBob">
          GitHub
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
