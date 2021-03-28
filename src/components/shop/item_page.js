import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router"
const axios = require('axios');

function Item_Page() {

  let id = useParams();

  function purchseItem() {
    var stripe = window.Stripe('pk_test_51IMhDjDACjkjrvMm0D7gtuvvHOCY8Z9dGTjwVFxFcmWHlGfjn9CGEdvyvs5vMQrAQDwmBcELSzSb2kTNf65eyJkw00AXucR70x')
    axios.post('http://localhost:5000/stripe/create-checkout-session/',{item_id: id.id})
     .then(session => stripe.redirectToCheckout({sessionId: session.data.id}))
     .catch(error => console.log(error))
  }

  return (
    <div>
      This is an item page that would normally contain information about a given item on the shop. To purchase this item click the purchse button shown below. <br />
      <div>
        <h3>Product #1</h3>
        <h5>$20.00</h5>
      </div>
      <button onClick={purchseItem}>Purchase</button>
    </div>
  );
}

export default Item_Page;
