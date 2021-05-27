import react, { useEffect, useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";
import "../css/mobile_drawer.css";
import { useHistory } from "react-router-dom";
import ht_logo from "../images/ht_logo.png";
import cart_empty from "../images/CartEmpty.svg";
import cart_not_empty from "../images/CartNotEmpty.svg";
import account_circle from "../images/account_circle.png";
import MobileDrawer from "./mobile_drawer.js"; 
import xicon from "../images/x-icon.png";
import Modal from 'react-modal';
const axios = require('axios');

var shippo = require('shippo')('shippo_test_1e5dfe70515f773e34da3713d3ecfdc0203a80a9');

function Navbar(props) {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [address1, setAddress1] = useState(''); 
  const [address2, setAddress2] = useState(''); 
  const [city, setCity] = useState(''); 
  const [state, setState] = useState(''); 
  const [ZIP, setZIP] = useState('');
  const [drawerState, setDrawerState] = useState(false);
  const [modalWidth, setModalWidth] = useState(window.innerWidth > 1024 ? '60%' : '90%'); 

  function handleDrawerState() {
    let newState = !drawerState;
    setDrawerState(newState);
  } 

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
      width                 : modalWidth,
      transform             : 'translate(-50%, -50%)'
    }
  };

  async function checkout() {
    let quota = window.localStorage.getItem("QUOTA")
    if (!quota) {
      alert("Your cart is currently empty. Add items to your cart on the shop page.");
      return;
    }

    const cart = {"cart": []}
    let cart_quantity = 0;
    for(let i = 0; i < quota; i++) {
      let item = window.localStorage.getItem("JXYSDFH65F" + i);
      cart["cart"].push(item);
      cart_quantity = cart_quantity + JSON.parse(item).quantity;
    }

    // ABHAY: This is your resulting object for Shippo after the intermediary address screen. 
    var addressTo = await shippo.address.create({ 
      name: "Customer",
      street1: address1,
      street2: address2,
      city: city,
      state: state, 
      zip: ZIP,
      country: "US",
      validate: true,
    }, function(err, address) {
      // console.log(address);
    });

    if(city.length == 0 || state.length == 0 || !addressTo.validation_results.is_valid) {
      alert("The address you entered is invalid. Please enter a valid address.");
      return;
    }

    const addressFrom = await shippo.address.create({
      name: "test",
      street1: "201 Civic Center Drive East",
      street2: "",
      city: "Santa Ana",
      state: "CA", 
      zip: "92701",
      country: "US",
      validate: true,
    }, function(err, address) {
      // console.log(address);
    })
    let item_weight = 6; //6 oz
    const parcel = {
      length: '8',
      width: '7',
      height: '6',
      distance_unit: 'in',
      weight: cart_quantity * item_weight,
      mass_unit: 'oz',
    }

    var shipment = await shippo.shipment.create({
      address_from: addressFrom,
      address_to: addressTo,
      parcels: [parcel],
      async: false,
    }, function(err, shipment) {
      // console.log(shipment);
    });

    let shipping_rate = 0;
    let rate_found = true;
    if(parcel.weight < 13) {
      for(let i = 0; i<shipment.rates.length;i++) {
        if(shipment.rates[i].provider == "USPS" && shipment.rates[i].servicelevel.token == "usps_first") shipping_rate = shipment.rates[i].amount;
      }
      if(shipping_rate == "0") rate_found = false;
    }
    else {
      shipping_rate = 10000; // arbitrary large value
      for(let i = 0; i<shipment.rates.length;i++) {
        if(shipment.rates[i].provider == "UPS" && shipment.rates[i].amount < shipping_rate) shipping_rate = Number(shipment.rates[i].amount);
      }
      if(shipping_rate == 10000) rate_found = false;
    }
    if(!rate_found) {
      shipping_rate = 10000; // arbitrary large value
      for(let i = 0; i<shipment.rates.length;i++) {
        if(shipment.rates[i].amount < shipping_rate) shipping_rate = Number(shipment.rates[i].amount);
      }
    }
    // console.log(shipping_rate);

    const req = {
      amount: 0,
      success_url: "http://localhost:3000/thank_you",
      cancel_url: "http://localhost:3000/",
      cart: cart,
      shipping_rate: shipping_rate*100,// $10
      shipping_address: addressTo,
      type: "purchase"
    }

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
            <p className="name">{item.name}</p>
            <p className="qty">{item.quantity} @ {`$${item.price.slice(0, -2)}.${item.price.slice(-2)}`}/ea</p>
            <a onClick={() => {removeItem("JXYSDFH65F" + i); forceUpdate();}}><img src={xicon}/></a>
          </div>
        </div>
      )
    }
    return cartItems;
  }

  // Rerender navbar every time the cart changes
  useEffect(() => {
    forceUpdate();
  }, [props.cartUpdate])
      

  useEffect(() => { 
    function handleResize() {
      // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight) 
      setModalWidth(window.innerWidth > 1024 ? '60%' : '90%'); 
    }
  
    window.addEventListener('resize', handleResize); 
  });

  return (
    <div style={{fontWeight: "700"}}> 
      <div className="row no-gutters">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Checkout Delivery Address Modal"
          style={customModalStyles}
        >
          <div className="row no-gutters justify-content-center">
            <h2>Address Info</h2>
            <p className="address-vertical-padding">Before you check out, please provide your address information and verify your cart appears correct. Upon clicking the check-out button, an extra item will be added to your cart to account for shipping costs.</p>
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
            <div className="col-8 col-md-4">
              <input
                type="text"
                placeholder=""
                value={city}
                class="modal-input-field"
                onChange={onCityChange}
              />
            </div>
            <div className="col-4" />
          </div>
          <div className="row no-gutters justify-content-center">
            <div className="col-4">
              <h3>State</h3>
            </div>
            <div className="col-8 col-md-4">
              <input
                type="text"
                placeholder=""
                value={state}
                class="modal-input-field"
                onChange={onStateChange}
              />
            </div>
            <div className="col-4" />
          </div>
          <div className="row no-gutters justify-content-center">
            <div className="col-4">
              <h3>ZIP</h3>
            </div>
            <div className="col-8 col-md-4">
              <input
                type="text"
                placeholder=""
                value={ZIP}
                class="modal-input-field"
                onChange={onZIPChange}
              />
            </div>
            <div className="col-4" />
            <div className="col-8 hr"></div>
            <div className="col-12" align="center">
              <h2>Your Cart</h2>
            </div>
            {getCartItemList()}
            <div className="checkout-button-container col-12">
              <button className="btn checkOutButton" onClick={checkout}>Check-Out</button>
            </div>
          </div>
        </Modal>
        <div className="col-2 offset-md-5" align="center">
          <div className="logo-container" style={{display: "inline-block"}}> 
            <img onClick={() => (window.location = "/")} className="imgSpacing" src={ht_logo} />
          </div>
        </div>
        <div className="col-10 col-md-5" align="right">
          <div align="right">
            <img 
              class="buttonSpacing" 
              src={!window.localStorage.getItem("QUOTA") || window.localStorage.getItem("QUOTA") == 0 
                ? cart_empty : cart_not_empty} onClick={openModal} 
            />
            <div className="mobile-drawer">
              <div>
              <img onClick={handleDrawerState} className="hamburger-spacing" src="https://img.icons8.com/ios/36/000000/menu--v6.png"/>
              </div> 
            </div>
          </div>
        </div>
        {!drawerState ? 
              <></>
              :
              <div class="container-fluid fade-animation p-0 dropdown-container">
                <hr style={{border: "1px solid gray", marginRight: "2rem"}}/>
                <div class="row no-gutters" style={{paddingTop: "0rem", marginTop: "0rem"}}>
                    <div class="col-12" style={{paddingTop: "0rem", marginTop: "0rem"}}>
                    <p onClick={() => (window.location = "/about")}>About</p>
                    </div>
                    <div class="col-12">
                    {/* Link to programs */}
                    <p onClick={() => (window.location = "/programs")}>Programs</p> 
                    </div>
                    <div class="col-12">
                    <p onClick={() => (window.location = "/volunteer_events")}>Volunteer</p>
                    </div>
                    <div class="col-12">
                    <p onClick={() => (window.location = "/shop")}>Shop</p>
                    </div>
                    <div class="col-12">
                    <p onClick={() => (window.location = "/donation")}>Donate</p>
                    </div>
                  </div>
                </div>
                }
      </div> 
      <div className="navbar-content .d-none .d-sm-block" align="center">
        <div class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col-2 offset-1">
              <h4 onClick={() => (window.location = "/about")}className="text">About</h4>
            </div>
            <div class="col-2">
              {/* Link to programs */}
              <h4 className="text" onClick={() => (window.location = "/programs")}>Programs</h4> 
            </div>
            <div class="col-2">
              <h4 onClick={() => (window.location = "/volunteer_events")} className="text">
                Volunteer
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
