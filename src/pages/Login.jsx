import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Link } from '@mui/material';
import { signIn } from '../API/fireAuth';
import { UserContext } from '../context/UserContext';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: false, password: false });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ email: false, password: false });
    if (!formData.email || !formData.password) {
      setErrors({ email: !formData.email, password: !formData.password });
      return;
    }
    try {
      const userCredential = await signIn(formData.email, formData.password);
      setUser(userCredential);
      if (userCredential != null) navigate('/');
    } catch (error) {
      const newErrors = { ...errors };
      if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
        newErrors.email = true;
      } else if (error.code === 'auth/wrong-password') {
        newErrors.password = true;
      }
      setErrors(newErrors);
    }
  };

  return (
    <Container className='glass text-light login' component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? "Invalid email address or user doesn't exist" : ''}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password ? 'Incorrect password' : ''}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
        <Link onClick={() => navigate('/signup')} variant="body2">
          Sign Up
        </Link>
        <Link onClick={() => navigate('/ForgotPassword')} ml={2} variant="body2">
          Forgot password?
        </Link>
      </form>
    </Container>
  );
};

export default Login;