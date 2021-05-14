import react, { useEffect, useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";
import { useHistory } from "react-router-dom";
import ht_logo from "../images/ht_logo.png";
import cart from "../images/cart.png";
import account_circle from "../images/account_circle.png";
import MobileDrawer from "./mobile_drawer.js"; 
import xicon from "../images/x-icon.png";
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
    if (!quota) {
      alert("Your cart is currently empty. Add items to cart on the shop page.");
      return;
    }
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
  
  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  function removeItem(lsId) {
    localStorage.removeItem(lsId);
    let quota = window.localStorage.getItem("QUOTA");
    realignLsIds();
    quota--;
    window.localStorage.setItem("QUOTA", quota);
  }

  function realignLsIds() {
    let quota = window.localStorage.getItem("QUOTA");
    let i;
    for (i = 0; i < quota; i++) {
      if (!window.localStorage.getItem("JXYSDFH65F" + i))
        break;
    }
    for (let j = i + 1; j <= quota; j++) {
      let item = window.localStorage.getItem("JXYSDFH65F" + j)
      window.localStorage.setItem("JXYSDFH65F" + (j - 1), item)
    }
  }

  function getCartItemList() {
    let quota = window.localStorage.getItem("QUOTA");
    if (quota == 0) {
      return(
        <div className="col-12 row justify-content-center">
          <p>Cart is empty!</p>
        </div>
      );
    }
    const cartItems = [];
    for(let i = 0; i < quota; i++) {
      let item = JSON.parse(window.localStorage.getItem("JXYSDFH65F" + i));
      cartItems.push(
        <div className="col-12 cart-item">
          <div className="cart-image" style={{backgroundImage: `url(${item.images[0]})`}}></div>
          <div className="item-info">
            <p>{item.name}</p>
            <p>{item.quantity} @ {`$${item.price.slice(0, -2)}.${item.price.slice(-2)}`}/ea</p>
            <a onClick={() => {removeItem("JXYSDFH65F" + i); forceUpdate();}}><img src={xicon}/></a>
          </div>
        </div>
      )
    }
    return cartItems;
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
          <div className="row no-gutters justify-content-center">
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
            <div className="col-8 hr"></div>
            <div className="col-12">
              <h3>Your Cart</h3>
            </div>
            {getCartItemList()}
            <div className="checkout-button-container col-12">
              <button className="btn checkOutButton" onClick={checkout}>Check-Out</button>
            </div>
          </div>
        </Modal>
        <div className="col-4 offset-4" align="center">
          <div align="center" style={{display: "inline-block"}}> 
            <h1 className="navbar-title-text" onClick={() => (window.location = "/")}>
              <img className="imgSpacing" src={ht_logo} />
            </h1>
          </div>
        </div>
<<<<<<< HEAD
        <div className="col-6 offset-2 offset-md-0 col-md-4" align="right">
          <div align="right" className="rightSpacing" style={{display: "inline-block"}}>
            {/* <img onClick={() => (window.location = "/login")} class="buttonSpacing" src={account_circle} /> */}
            {/* <img class="buttonSpacing" src={cart} /> */}
            <button className="btn checkOutButton" onClick={openModal}>Check-Out</button>
            <br/>
            <div className="mobile-drawer">
              <MobileDrawer />
            </div>
=======
        <div className="col-4" align="right">
          <div align="right" style={{display: "inline-block"}}>
            <img onClick={() => (window.location = "/login")} class="buttonSpacing" src={account_circle} />
            <img class="buttonSpacing" src={cart} />
            <button className="btn checkOutButton" onClick={openModal}>Check-Out</button>
>>>>>>> ABHAY_BRANCH_6
          </div>
        </div>
      </div> 
      <div className="navbar-content .d-none .d-sm-block" align="center">
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
