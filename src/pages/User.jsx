import { useEffect, useState } from 'react'
import { getUser, updateUser } from '../API/firedb';
import { useParams } from 'react-router-dom';
import PokeCard from '../components/PokeCard';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './User.css';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
async function getUserData(id) {
  try {
    const user = await getUser(id);
    console.log('User data:', user); // Log the user data
    return user;
  } catch (error) {
    console.error('Error getting user data:', error); // Log the error
  }
}

const User = () => {
  const { user } = useContext(UserContext);
  const loggedInUserId = user ? user.uid : null;
  const {id} = useParams();
  const [displayUser, setDisplayUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');

  // Assume this comes from your auth context or similar
  

  useEffect(() => {
    getUserData(id).then((data) => {
      setDisplayUser(data);
      setBio(data.bio);
    });
  }, [id]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleBioSubmit = async () => {
    await updateUser(id, { bio });
    setEditMode(false);
  };
if (!displayUser) {
    return <div>Loading...</div>;
  }else{
  return (
    <>
      <Card className='glass text-light User-page' sx={{marginBlock: '10px'}}>
        {displayUser && (
          <CardContent className=''>
            <Typography variant="h4">{displayUser.username}</Typography>
            <Typography variant="h5">Bio</Typography>
            {editMode ? (
              <div>
                <TextField fullWidth multiline value={bio} onChange={handleBioChange} />
                <Button variant="contained" color="primary" onClick={handleBioSubmit}>Save</Button>
              </div>
            ) : (
              <Typography variant="body1">{bio}</Typography>
            )}
            {loggedInUserId === id && !editMode && (
              <Button variant="contained" color="secondary" onClick={() => setEditMode(!editMode)}>
                {'Edit Bio'}
              </Button>
            )}
          </CardContent>
        )}
      </Card>
      <Card className='glass text-light User-page'>
        <CardContent>
          <Typography variant="h5">{displayUser.username}'s Favorites</Typography>
          <div className='card-list'>
            {displayUser.favorites && Object.keys(displayUser.favorites).map((id) => (
              <PokeCard key={id} id={id}/>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
}

export default User