import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Button, TextField, Typography, Card, CardContent, Alert } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
      setSeverity('success');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setSeverity('error');
    }
  };

  return (
    <Card className='glass text-light'>
      <CardContent>
        <Typography variant="h4">Forgot Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type='email'
            label='Email'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin={'normal'}
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>Reset Password</Button>
        </form>
        {message && <Alert severity={severity}>{message}</Alert>}
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;