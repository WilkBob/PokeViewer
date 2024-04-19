import { useEffect, useState } from 'react'
import { getUser, updateUser } from '../API/firedb';
import { useParams } from 'react-router-dom';
import PokeCard from '../components/PokeCard';
import './User.css';

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
  const {id} = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');

  // Assume this comes from your auth context or similar
  const loggedInUserId = '7uiVA40nijY53CF3phI7AtmQ4Mq1';

  useEffect(() => {
    getUserData(id).then((data) => {
      setUser(data);
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

  return (
    <div className='glass text-light User-page'>
      {user && <div>
        <h1>{user.username}</h1>
        <h2>Bio</h2>
        {editMode ? (
          <div>
            <textarea value={bio} onChange={handleBioChange} />
            <button onClick={handleBioSubmit}>Save</button>
          </div>
        ) : (
          <p>{bio}</p>
        )}
        {loggedInUserId === id && (
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit Bio'}
          </button>
        )}
        <div className='user-favorites'>
          <h2>{user.username}'s Favorites</h2>
          <div className='card-list'>
            {user.favorites && Object.keys(user.favorites).map((id) => (
              <PokeCard key={id} id={id}/>
            ))}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default User