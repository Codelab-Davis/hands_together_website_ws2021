import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/donation.css";
require('dotenv').config();
const axios = require('axios');

function Donation() {
  const [donation, setDonation] = useState("");
  const [type, setType] = useState("");

  function onDonationChange(event) {
    if(!isNaN(Number(event.target.value)))
      setDonation(event.target.value);
    else
      event.target.value = event.target.value.slice(0,-1);
  }

  function customDonation(e) {
    e.preventDefault();
    checkout(parseFloat(donation).toFixed(2));
  }

  function checkout(donationAmount) {
    // console.log(donationAmount);
    // console.log(type);
    var stripe = window.Stripe(process.env.REACT_APP_STRIPE_KEY);

    const req = {
      amount: donationAmount*100,
      success_url: "http://localhost:3000/thank_you",
      cancel_url: "http://localhost:3000/",
      type: "donation",
      mode: type
    }

    axios.post('http://localhost:5000/stripe/create-checkout-session/', req)
      .then(session => {
        // console.log(session.data.id);
        stripe.redirectToCheckout({sessionId: session.data.id})
      })
      .catch(error => console.log(error))
  }

  return(
    <div id="shop-wrapper">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <h1 className="heading">Your Donation Matters</h1>

          <h3 className="donation-text">
            Your gift to Hands Together allows us to provide greater resources to the advanced early childhood education for the children of our working families in the center of Santa Ana and surrounding areas.
          </h3>

          <div className="donation-container">
            <div className="row no-gutters donation-row justify-content-center">
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="donation-padding">
                  <div className="donation-box donation-button-animation" onClick={() => checkout(10)}>
                    <h1 className="donation-amount-text">$10</h1>
                    <p className="donation-use-text">will provide in-classroom cooking experiences for the children</p>
                  </div>
              </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="donation-padding">
                  <div className="donation-box donation-button-animation" onClick={() => checkout(50)}>
                    <h1 className="donation-amount-text">$50</h1>
                    <p className="donation-use-text">will provide take-home book bags for the children</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="donation-padding">
                  <div className="donation-box donation-button-animation" onClick={() => checkout(100)}>
                    <h1 className="donation-amount-text">$100</h1>
                    <p className="donation-use-text">will provide classroom supplies, including indoor art materials, books, science experiment materials, writing aids, etc.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-gutters donation-row">
              <div className="col-sm-12 col-md-6">
                <div className="donation-padding">
                  <div className="donation-box donation-button-animation" onClick={() => checkout(250)}>
                    <h1 className="donation-amount-text">$250</h1>
                    <p className="donation-use-text">will provide outdoor play equipment for the children, including hula hoops, various sports balls, tricycles, wagons, rocking toys, outdoor art materials, etc.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="donation-padding">
                  <div className="donation-box donation-button-animation" onClick={() => checkout(500)}>
                    <h1 className="donation-amount-text">$500</h1>
                    <p className="donation-use-text">will provide tuition assistance for a struggling family</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="donation-container" method="" action="" onSubmit={customDonation}>
            <div className="row no-gutters form-item">
              <div className="col-12 col-sm-6 col-md-6">
                <h3 className="form-text">Give a custom amount</h3>
              </div>
              <div className="col-12 col-sm-6 col-md-6">
                <input type="text" onChange={onDonationChange} required/>
                <p className="form-option">Custom Amount (formatting: xx.xx)</p>
              </div>
            </div>
            <div className="row no-gutters form-item">
              <div className="col-12 col-sm-7 col-md-6">
                <h3 className="form-text">What type of donation are you making?</h3>
              </div>
              <div className="col-12 col-sm-5 col-md-6">
                <input type="radio" id="one-time" name="donation-type" value="one-time" onClick={() => setType("one-time")} required/>
                <label for="one-time"><p className="form-option">One-time Donation</p></label><br/>
                <input type="radio" id="recurring" name="donation-type" value="recurring" onClick={() => setType("recurring")} required/>
                <label for="recurring"><p className="form-option">Recurring Donation</p></label>
              </div>
            </div>
            <div className="text-center">
              <button className="donate-button" type="submit">Donate</button>
            </div>

          </form>


        </div>
      </div>
    </div> 
  );
}
  
export default Donation;