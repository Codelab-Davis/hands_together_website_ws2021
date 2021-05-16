import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import "../../css/admin_dashboard.css";
import kid from "../../images/kid.png";  
import { propTypes } from "react-bootstrap/esm/Image";
const axios = require('axios');
//https://react-bootstrap.github.io/components/modal/#modal-dialog-props
//https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
function Admin_Dashboard(props) {
  function logout() {
    console.log(props.loggedIn);
    axios.delete('http://localhost:5000/jwt/deleteRefreshToken', { withCredentials: true })
     .then(() => props.setLoggedIn(false));
  }
  
  return ( 
    <div className="container-fluid p-0"> 
      <div className="row no-gutters"> 
      <div className="col-12"> 
        <h1 className="title-text">Welcome to your admin dashboard!</h1>
      </div> 
        <a className="col-5 admin-box" href="/add_shop_item">
          <h2>Add Shop Items</h2> 
          <p>Click here to add a new item to your shop!</p>  
        </a> 
        <a className="col-5 admin-box" href="/add_event">
          <h2>Add an event</h2> 
          <p>Click here to create a new event!</p>  
        </a> 
        <a className="col-5 admin-box" href="/view_shop_items">
          <h2>View Listed and Sold Shop Items</h2> 
          <p>Click here to view your active shop listings and all sold shop items.</p>  
        </a> 
        <a className="col-5 admin-box" href="/view_events">
          <h2>View Listed Events and Volunteers</h2> 
          <p>Click here to view your listed events and the volunteers signed up for each one.</p>  
        </a> 
      </div>
    </div>
  );
}

export default Admin_Dashboard;

