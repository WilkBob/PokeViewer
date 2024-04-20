
import { Menu, MenuItem } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import {signOut} from '../API/fireAuth';
import { useNavigate } from "react-router-dom";

export function MenuNav({
  anchorEl,
  open,
  handleClose,
  Link
}) {
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  return <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
    vertical: 'top',
    horizontal: 'left'
  }} keepMounted transformOrigin={{
    vertical: 'top',
    horizontal: 'left'
  }} open={open} onClose={handleClose}>
          <MenuItem key='menu1' onClick={handleClose} component={Link} to="/">Home</MenuItem>
          <MenuItem key='menu2' onClick={handleClose} component={Link} to="/List">PokeList</MenuItem>
          <MenuItem key='menu3' onClick={handleClose} component={Link} to="/contact">Contact</MenuItem>
          {!user && [<MenuItem key='menu4' onClick={handleClose} component={Link} to="/login">Login</MenuItem>,
          <MenuItem key='menu5' onClick={handleClose} component={Link} to="/signup">Sign Up</MenuItem>]}
          {user && [<MenuItem key='menu6' onClick={handleClose} component={Link} to={`/user/${user.uid}`}>Your Profile</MenuItem>, 
          <MenuItem key='menu7' onClick={()=>{setUser(null); signOut(); handleClose; navigate('/', {replace: true})}}>Logout</MenuItem>]}
          
        </Menu>;
}
  