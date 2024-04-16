import { useEffect, useState } from 'react'
import { getUser } from '../API/firedb';
import { useParams } from 'react-router-dom';

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
  useEffect(() => {
    getUserData(id).then((data) => {
      setUser(data);
      console.log(data);
    });
  }, [id]);

  return (
    <div className='glass text-light'>
      <h1>User Profile</h1>
      {user && <div>
        <h1>{id}</h1>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </div>}
    </div>
  )
}

export default User
