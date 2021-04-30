import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Logout(props) {
  function onSubmit() {
    props.setLoggedIn(false);

    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    axios.post('http://localhost:5000/jwt/deleteRefreshToken', { token: refreshToken })
    return;
  }

  useEffect(() => {
    console.log(props.loggedIn);
  })
  
  return (
    <div className="logout-container">
      <h1>Log Out</h1>
      <form onSubmit={onSubmit}>
        <input type="submit" value="Log Out"/>
      </form>
    </div>
  );
}

export default Logout;