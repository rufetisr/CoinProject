import React, { useContext } from 'react'
import context from '../Context/Context';
import "./UserProfile.css";
import defpicture from '../../src/Pictures/defprofile.png'
// import { googleLogout } from '@react-oauth/google';

const UserProfile = () => {
  let { user, setUser } = useContext(context);

  function handleSignout(e) {
    setUser({});
  }
  
  return (
    <>
      <div>UserProfile</div>
      <h2>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h2>
      <p>{user.signedEmail}</p>
      <p>{user.password}</p>
      <img className='profile-img' src={user.imgUrl != 'undefined' && user.imgUrl != null ? user.imgUrl : defpicture} alt='userImg'></img>

      <button onClick={(e) => handleSignout(e)}>Sign Out</button>
    </>

  )
}

export default UserProfile;