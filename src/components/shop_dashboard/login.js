import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameInput = e => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const credentials = {
      user: userName,
      pass: password
    }

    axios.get("https://db.handstogether-sa.org/login/", { params: credentials })
      .then(res => {
        // console.log(res.data);
        if (res.data) {
          axios.post('https://db.handstogether-sa.org/jwt/generateAccessToken', { user: userName }, { withCredentials: true })
           .then(() => props.setLoggedIn(true))
        }
      });
  }

    return (
      <div>
        <div className="row no-gutters">
          <div className="col-6 offset-3">
            <h1 style={{marginTop: "3rem"}}>Login</h1>
            <form onSubmit={onSubmit}>
              <label>Username</label>
              <input type="text" value={userName} onChange={handleUserNameInput}/>
              <label>Password</label>
              <input type="text" value={password} onChange={handlePasswordInput}/>
              <input type="submit" value="Log In" className="submit-button" style={{marginBottom: "2rem"}}/>
            </form>
          </div> 
        </div>
      </div>
    );
}

export default Login;