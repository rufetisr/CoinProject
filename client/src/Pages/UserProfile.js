import React, { useContext } from 'react'
import context from '../Context/Context';
import "./UserProfile.css";

const UserProfile = () => {
  let { user, setUser } = useContext(context);

  return (
    <>
      <div>UserProfile</div>
      <h2>{user.name}</h2>
      <p>{user.signedEmail}</p>
      <p>{user.password}</p>
      <img className='profile-img' src={user.imgUrl} alt='UserImg'></img>
    </>

  )
}

export default UserProfile;