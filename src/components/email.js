import React from 'react';
import htlogo from "../images/ht_logo.png"

function Email() {

  let logo = {
      "display": "flex",
      justifyContent: "center",
      alignItems: "center"
  }

  let header = {
      display: "flex",
      justifyContent: "center",
      "margin-top": "1.625rem"
  }

  let textContainer = {
    "margin-bottom": "1.8125rem",
  }

  return(
    <div>
        <div style={logo}>
            <img src={htlogo}/> 
        </div>
        <h1 style = {header}>Thank you!</h1>

        <div className="text-container" style={textContainer}>
            <h2>Hi name,</h2>
            <p>Thank you so much for your purchase. As soon as your package is shipped, you’ll receive a shipping confirmation email from us. </p>
        </div>

        <div className="text-container" style={textContainer}>
            <h2>Delivery Address</h2>
            <p>Chancellor May <br/>1 Shields Ave. <br/>Davis, CA, 95616 </p>
        </div>

        <div className="text-container" style={textContainer}>
            <h2>Order Info</h2>
            <p>Transaction #: 3490-58i34905490-35k3489534-53 <br/>Items Ordered: Bird Earrings (quantity: 2), Feather of Hope (quantity: 1) <br/>Total: $23.99 </p>
        </div>
    </div>
  )
}

export default Email;