import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/donation.css";
const axios = require('axios');

function Donation() {
  const [donation, setDonation] = useState("");

  function onDonationChange(event) {
    setDonation(event.target.value);
  }

  function customDonation(e) {
    e.preventDefault();
    checkout(donation);
  }

  function checkout(donationAmount) {
    console.log(donationAmount);
    var stripe = window.Stripe('pk_test_51IMhDjDACjkjrvMm0D7gtuvvHOCY8Z9dGTjwVFxFcmWHlGfjn9CGEdvyvs5vMQrAQDwmBcELSzSb2kTNf65eyJkw00AXucR70x');

    const req = {
      amount: donationAmount,
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
      type: "donation"
    }

    axios.post('http://localhost:5000/stripe/create-checkout-session/', req)
      .then(session => {
        console.log(session.data.id);
        stripe.redirectToCheckout({sessionId: session.data.id})
      })
      .catch(error => console.log(error))
  }

  return(
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <h1 className="heading">Your Donation Matters</h1>

        <h3 className="donation-text">
          Your gift to Hands Together allows us to provide greater resources to the advanced early childhood education for the children of our working families in the center of Santa Ana and surrounding areas. <br/><br/>A big thank you for your generous donation - we are thrilled you have chosen to support Hands Together. The children’s success is vastly broadened through the generosity of donations like yours.
        </h3>

        <div className="donation-container">
          <div className="row no-gutters donation-row">
            <div className="donation-small" onClick={() => checkout(1000)}>
              <h1 className="donation-amount-text">$10</h1>
              <p className="donation-use-text">will provide in-classroom cooking experiences for the children</p>
            </div>
            <div className="donation-small" onClick={() => checkout(5000)}>
              <h1 className="donation-amount-text">$50</h1>
              <p className="donation-use-text">will provide take-home book bags for the children</p>
            </div>
            <div className="donation-small" onClick={() => checkout(10000)}>
              <h1 className="donation-amount-text">$100</h1>
              <p className="donation-use-text">will provide classroom supplies, including indoor art materials, books, science experiment materials, writing aids, etc.</p>
            </div>
          </div>
          <div className="row no-gutters donation-row">
            <div className="donation-large" onClick={() => checkout(25000)}>
              <h1 className="donation-amount-text">$250</h1>
              <p className="donation-use-text">will provide outdoor play equipment for the children, including hula hoops, various sports balls, tricycles, wagons, rocking toys, outdoor art materials, etc.</p>
            </div>
            <div className="donation-large" onClick={() => checkout(50000)}>
              <h1 className="donation-amount-text">$500</h1>
              <p className="donation-use-text">will provide tuition assistance for a struggling family</p>
            </div>
          </div>
        </div>

        <form className="donation-container" method="" action="" onSubmit={customDonation}>
          <div className="row no-gutters form-item">
            <div className="col-md-6">
              <h3>Give a custom amount</h3>
            </div>
            <div className="col-md-6">
              <input type="text" onChange={onDonationChange}/>
              <p className="form-option">Custom Amount</p>
            </div>
          </div>
          <div className="row no-gutters form-item">
            <div className="col-md-8">
              <h3>What type of donate are you making?</h3>
            </div>
            <div className="col-md-4">
              <input type="radio" id="one-time" name="donation-type" value="one-time"/>
              <label for="one-time"><p className="form-option">One-time Donation</p></label><br/>
              <input type="radio" id="recurring" name="donation-type" value="recurring"/>
              <label for="recurring"><p className="form-option">Recurring Donation</p></label>
            </div>
          </div>
          <div className="row no-gutters form-item">
            <div className="col-md-8">
              <h3>Payment Method</h3>
            </div>
            <div className="col-md-4">
              <input type="radio" id="credit-card" name="payment-method" value="credit-card"/>
              <label for="credit-card"><p className="form-option">Credit Card</p></label><br/>
              <input type="radio" id="debit-card" name="payment-method" value="debit-card"/>
              <label for="debit-card"><p className="form-option">Debit Card</p></label>
            </div>
          </div>
          <div className="text-center">
            <button className="donate-button" type="submit"><h2>Donate</h2></button>
          </div>

        </form>


      </div>
    </div>
  );
}
  
export default Donation;