import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router"
import { useEffect, useState } from 'react';
const axios = require('axios');

function Item_Page() {
  let id = useParams();

  const [item, setItem] = useState();
  useEffect(() => {
    axios.get('http://localhost:5000/items/get_item/' + id.id.substr(1))
      .then((res) => {
        setItem(res.data);
      })
  }, [])

  function purchseItem() {
    var stripe = window.Stripe('pk_test_51IMhDjDACjkjrvMm0D7gtuvvHOCY8Z9dGTjwVFxFcmWHlGfjn9CGEdvyvs5vMQrAQDwmBcELSzSb2kTNf65eyJkw00AXucR70x')
    axios.post('http://localhost:5000/stripe/create-checkout-session/',{item: item})
     .then(session => stripe.redirectToCheckout({sessionId: session.data.id}))
     .catch(error => console.log(error))
  }

  return (
    <div>
      This is an item page that would normally contain information about a given item on the shop. To purchase this item click the purchse button shown below. <br />
      <div>
        <h3>{item ? item.name : "Name Placeholder"}</h3>
        <h5>
          {item 
            ? "$" + item.price.slice(0, -2) + "." + item.price.slice(-2) 
            : "Price Placeholder"}
        </h5>
      </div>
      <button onClick={purchseItem}>Purchase</button>
    </div>
  );
}

export default Item_Page;
