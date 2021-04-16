import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require('axios');

function Donation() {

  const [needPaymentInfo, setNeedPaymentInfo] = useState(false);
  
  function requirePaymentInfo() {
    setNeedPaymentInfo(true);
  }
  function getPaymentInfo() {
    // axios.post('http://localhost:5000/stripe/donate')
    //  .then(res => console.log(res.data))
    var response = axios.get('http://localhost:5000/stripe/donate')
     .then(res => {
       var clientSecret = res.data.client_secret;
     })
     
  }
  return !needPaymentInfo ? (
    <>
      <h1>Donate</h1>

      <form method="" action="">
        <div>
          <label for="name">Name: </label>
          <input id="name" type="text" name="name" />
        </div>
        <div>
          <label for="email">Email address: </label>
          <input id="email" type="email" name="email" />
        </div>
        <div>
          <label for="amount">Amount: </label>
          <input id="amount" type="number" name="amount" min="10" />
        </div>
        <div>
          <button type="button" onClick={getPaymentInfo}>Test Button</button>
        </div>
        <div>
          <button type="submit" onClick={getPaymentInfo}>Next</button>
        </div>
      </form>
    </>
  ) : 
    <>
      <h1>Complete your donation</h1>
      <p>Please enter your payment details below to complete your donation.</p>

      <form method="POST" action="/donate/thanks" id="card">
        <div>
          <label for="cardholder-name">Cardholder name: </label>
          <input id="cardholder-name" type="text" name="cardholder-name" value="" />
        </div>
        <div>
          <label for="card-element">Credit or debit card:</label>
          <div id="card-element"></div>
        </div>
        <div id="card-errors"></div>
        <div>
          <button id="card-button" data-secret="{{intentSecret}}">Donate amount: </button>
        </div>
      </form>
    </>
  ;
}
  
export default Donation;