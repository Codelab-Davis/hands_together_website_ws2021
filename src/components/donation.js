import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require('axios');
// const stripe = require('stripe')("sk_test_51IMhDjDACjkjrvMmiJxcdbJqejCQ3W9dwagP8gDp7l5wHk0Qm7oWgkmOKVqxVMOutTF7nKoPI86eX84PY6ZZqQj100pJsabLN1");

function Donation() {

  const donationEl = React.useRef(null);
  const [needPaymentInfo, setNeedPaymentInfo] = useState(false);
  
  function requirePaymentInfo() {
    setNeedPaymentInfo(true);
  }

  //donation page loads with dynamic price, just need to not charge tax lol
  const handleSubmit = e => {
    e.preventDefault();
    const donation = donationEl.current.value * 100;
    var stripe = window.Stripe('pk_test_51IMhDjDACjkjrvMm0D7gtuvvHOCY8Z9dGTjwVFxFcmWHlGfjn9CGEdvyvs5vMQrAQDwmBcELSzSb2kTNf65eyJkw00AXucR70x');

    const req = {
      amount: donation,
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
      type: "donation"
    }

    axios.post('http://localhost:5000/stripe/create-checkout-session/', req)
      .then(session => stripe.redirectToCheckout({sessionId: session.data.id}))
      .catch(error => console.log(error))
  }

  return !needPaymentInfo ? (
    <>
      <h1>Donate</h1>

      <form method="" action="" onSubmit={handleSubmit}>
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
          <input id="amount" type="number" name="amount" min="10" ref={donationEl} />
        </div>
        <div>
          <button type="submit">Next</button>
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