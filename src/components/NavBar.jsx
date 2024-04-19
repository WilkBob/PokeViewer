import { MenuNav } from './MenuNav';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <MenuNav anchorEl={anchorEl} open={open} handleClose={handleClose} Link={Link}  />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        {!user && <Button color="inherit" onClick={()=>navigate('/login')}>Login</Button>}
        {user && <Link to={`/user/${user.uid}`}><Avatar alt={user.name} src={user.profileImage}>{user.email[0]}</Avatar></Link>}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;