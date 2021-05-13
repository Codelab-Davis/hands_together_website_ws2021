import react, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";
import { useHistory } from "react-router-dom";
import ht_logo from "../images/ht_logo.png";
import cart from "../images/cart.png";
import account_circle from "../images/account_circle.png";
import Modal from 'react-modal';
const axios = require('axios');

function Navbar() {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [address1, setAddress1] = useState(''); 
  const [address2, setAddress2] = useState(''); 
  const [city, setCity] = useState(''); 
  const [state, setState] = useState(''); 
  const [ZIP, setZIP] = useState(''); 

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal(){
    setModalIsOpen(false);
  }

  function onAddress1Change(event) { 
    setAddress1(event.target.value); 
  }

  function onAddress2Change(event) { 
    setAddress2(event.target.value); 
  }

  function onCityChange(event) { 
    setCity(event.target.value); 
  }

  function onStateChange(event) { 
    setState(event.target.value); 
  }

  function onZIPChange(event) { 
    setZIP(event.target.value); 
  }

  const customModalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width                 : '50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  function checkout() {
    let quota = window.localStorage.getItem("QUOTA")
    const cart = {"cart": []}
    for(let i = 0; i < quota; i++) {
      cart["cart"].push(window.localStorage.getItem("JXYSDFH65F" + i))
    }
    const req = {
      amount: 0,
      success_url: "http://localhost:3000/thank_you",
      cancel_url: "http://localhost:3000/",
      cart: cart,
      type: "purchase"
    }

    // ABHAY: This is your resulting object for Shippo after the intermediary address screen. 
    const addressInfo = { 
      address: address1,
      address2: address2,
      city: city,
      state: state, 
      ZIP: ZIP,
    }
    console.log(addressInfo); 

    var stripe = window.Stripe('pk_test_51IMhDjDACjkjrvMm0D7gtuvvHOCY8Z9dGTjwVFxFcmWHlGfjn9CGEdvyvs5vMQrAQDwmBcELSzSb2kTNf65eyJkw00AXucR70x')
    axios.post('http://localhost:5000/stripe/create-checkout-session/', req) 
     .then(session => stripe.redirectToCheckout({sessionId: session.data.id}))
     .catch(error => console.log(error))
  }

  return (
    <div>
      <div className="row no-gutters">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Checkout Delivery Address Modal"
          style={customModalStyles}
        >
          <div className="row no-gutters">
            <div className="col-4">
              <h3>Address</h3>
            </div>
            <div className="col-8">
              <input
                type="text"
                placeholder=""
                value={address1}
                class="modal-input-field"
                onChange={onAddress1Change}
              />
            </div>
            <div className="col-4">
              <h3>Address #2</h3>
            </div>
            <div className="col-8">
              <input
                type="text"
                placeholder=""
                value={address2}
                class="modal-input-field"
                onChange={onAddress2Change}
              />
            </div>
            <div className="col-4">
              <h3>City</h3>
            </div>
            <div className="col-8">
              <input
                type="text"
                placeholder=""
                value={city}
                class="modal-input-field"
                onChange={onCityChange}
              />
            </div>
            <div className="col-4">
              <h3>State</h3>
            </div>
            <div className="col-8">
              <input
                type="text"
                placeholder=""
                value={state}
                class="modal-input-field"
                onChange={onStateChange}
              />
            </div>
            <div className="col-4">
              <h3>ZIP</h3>
            </div>
            <div className="col-8">
              <input
                type="text"
                placeholder=""
                value={ZIP}
                class="modal-input-field"
                onChange={onZIPChange}
              />
            </div>
            <button className="btn checkOutButton" onClick={checkout}>Check-Out</button>
          </div>
        </Modal>
        <div className="col-4 offset-4" align="center">
          <div align="center" style={{display: "inline-block"}}> 
            <h1 className="navbar-title-text" onClick={() => (window.location = "/")}>
              <img className = "imgSpacing" src={ht_logo} />
            </h1>
          </div>
        </div>
        <div className="col-4" align="right">
          <div align="right" style={{display: "inline-block"}}>
            <img onClick={() => (window.location = "/login")} class="buttonSpacing" src={account_circle} />
            <img class="buttonSpacing" src={cart} />
            <button className="btn checkOutButton" onClick={openModal}>Check-Out</button>
          </div>
        </div>
      </div> 
      <div className="navbar-content" align="center">
        <div class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col-2 offset-1">
              <h4 onClick={() => (window.location = "/about")}className="text">About</h4>
            </div>
            <div class="col-2">
              {/* Link to programs */}
              <h4 className="text">Programs</h4> 
            </div>
            <div class="col-2">
              <h4 onClick={() => (window.location = "/volunteer_events")} className="text">
                Volunteer & Events
              </h4>
            </div>
            <div class="col-2">
              <h4 onClick={() => (window.location = "/shop")} className="text">Shop</h4>
            </div>
            <div class="col-2">
              <h4 onClick={() => (window.location = "/donation")} className="text">Donate</h4>
            </div>
            <div className="col-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
