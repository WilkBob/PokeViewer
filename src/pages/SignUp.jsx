import React, { useContext, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { signUp } from '../API/fireAuth';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {user, setUser} = useContext(UserContext);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateUsername = (username) => {
    //no spaces or special characters
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(username);
  };

  const validateForm = () => {
    return (
      validateEmail(email) &&
      validatePassword(password) &&
      password === confirmPassword &&
      validateUsername(username)
    );};

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.error('Invalid form');
      alert('Invalid form');
      return;
    }

    try{
        const newUser = await signUp(email, password, username);
        setUser(newUser);
        console.log(newUser);
    }
    catch(error){
        console.error(error);
    }
  };

  if (user) {
    return (
      <Container className='glass text-light login'>
        <Typography variant="h4">You are already signed up!</Typography>
        <Button variant="contained" color="primary" onClick={()=>{navigate('/')}}>Go Home</Button>
      </Container>
    );
  }

  return (
    <Container className='glass text-light login' component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <hr></hr>
        <form noValidate onSubmit={handleSignUp}>
          <TextField
            error={!validateUsername(username)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username (no spaces or special characters)"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
          error={!validateEmail(email)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={!validatePassword(password)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            error={password !== confirmPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;