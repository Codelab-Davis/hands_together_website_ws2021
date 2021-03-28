import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import {Elements} from '@stripe/react-stripe-js';
const axios = require('axios');
//import {loadStripe} from '@stripe/stripe-js';

// stripe
// async function test() {
//     try {
//         //const stripe = require('stripe')('sk_test_51IMhDjDACjkjrvMmiJxcdbJqejCQ3W9dwagP8gDp7l5wHk0Qm7oWgkmOKVqxVMOutTF7nKoPI86eX84PY6ZZqQj100pJsabLN1');
//         const paymentIntent = await stripe.paymentIntents.create({
//           amount: 1477, // $14.77, an easily identifiable amount
//           currency: 'usd',
//         });
//         console.log('Worked! ', paymentIntent.id);
//     } catch(err) {
//         console.log('Error! ', err.message);
//     }
// }



function Donation() {

  const [needPaymentInfo, setNeedPaymentInfo] = useState(false);
  
  function requirePaymentInfo() {
    setNeedPaymentInfo(true);
  }
  function getPaymentInfo() {
    axios.post('http://localhost:5000/stripe/donate')
     .then(res => console.log(res.data))
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