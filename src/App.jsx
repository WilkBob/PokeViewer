import React from 'react';
import { Container } from '@mui/material';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Pokedex from './pages/Pokedex';
import Login from './pages/Login';
import './App.css'
import User from './pages/User.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Contact from './pages/Contact.jsx';
import SignUp from './pages/SignUp.jsx';
import Footer from './components/Footer.jsx';



function App() {
  
  return (
  <>
    <NavBar/>
    <Container maxWidth="md">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon/>} />
        <Route path='/List' element={<Pokedex/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/user/:id' element={<User/>} />
      </Routes>
    </Container>
    <Footer/>
  </>
  );
}

export default App;