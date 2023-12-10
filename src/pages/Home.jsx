// Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../components/style.module.css';

function Home() {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem('user'));
  const loginType = localStorage.getItem('loginType');

  function handleLogout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginType');
    navigate('/login');
  }

  return (
    <div className={style.home}>
      <div className={style.home_container}>
        <h1>Home</h1>
        <p>Welcome! {userName.name}</p>
        <h5>Logged in as : {loginType}</h5>
        <button className={style.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
