import React, { useEffect } from 'react';
import "../../css/thank_you.css"

function ThankYou() {

  useEffect(() => {
    window.localStorage.clear();
  })
  
  return(
    <div>
      <h1 className="thank-you-header">Thank You!</h1>
      <p className="thank-you-text">We’ve processed your transaction and a confirmation email should be on its way. </p>
    </div>
  )
}

export default ThankYou;