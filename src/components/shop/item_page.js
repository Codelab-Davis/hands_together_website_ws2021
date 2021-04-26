import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/item_page.css";
import { useParams } from "react-router"
import { useEffect, useState } from 'react';
import SoldItemsTestRoutes from "../shop_dashboard/sold_items_test_routes";
const axios = require('axios');

function Item_Page() {
  let id = useParams();

  const [item, setItem] = useState();
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/items/get_item/' + id.id)
      .then((res) => {
        setItem(res.data);
        console.log(res);
      })
  }, [])
  useEffect(() => {
    if (item)
      setImageLink(item.images[0]);
  }, [item]);

  function purchaseItem() {
    let transaction_id = "abcd1234";
    const req = {
      amount: 2000,
      success_url: "http://localhost:3000/order_summary/" + transaction_id,
      cancel_url: "http://localhost:3000/",
      item_id: id.id,
      type: "purchase"
    }
    var stripe = window.Stripe('pk_test_51IMhDjDACjkjrvMm0D7gtuvvHOCY8Z9dGTjwVFxFcmWHlGfjn9CGEdvyvs5vMQrAQDwmBcELSzSb2kTNf65eyJkw00AXucR70x')
    axios.post('http://localhost:5000/stripe/create-checkout-session/', req) // edit to also send in amount field with price info
     .then(session => stripe.redirectToCheckout({sessionId: session.data.id}))
     .catch(error => console.log(error))
  }

  function handleImageClick(index) {
    setImageLink(item.images[index]);
  }

  return ( 
    item ? (
      <div id="item-page-wrapper">
        <div className="header">
          <h1>{item.name}</h1>
          <h3 className="shop-description">
            Our handcrafted gifts for good are made by the parents in the Morning Garden Program. The Morning Garden Program provides the highest quality education to the children of working families. Each artisan can express their unique style in the creation of these hand-crafted goods. The embroidery styles are inspired by traditional techniques of various Latin American regions. All items are made of the best quality felt and 100% DMC cotton thread.
            <br/><br/>Proceeds from the sale of these items help our families gain economic stability and improve the emotional and physical lives of their families. 80% of the proceeds of these products are given directly to the artisan. The remaining 20% is used for the purchase of materials.
          </h3>
        </div>

        <div className="row no-gutters item-info">
          <div className="col-md-6 row no-gutters">
            <div className="col-md-2 side-image-container">
              {item.images.map((image, index) =>
                <div id={`image${index}`} onClick={() => handleImageClick(index)} className="side-image" style={{backgroundImage: `url(${image})`}}></div>
              )}
            </div>

            <div className="col-md-10 main-image-container">
              <div className="main-image" style={{backgroundImage: `url(${imageLink})`}}></div>
            </div>
          </div>
          
          <div className="col-md-6 right">
            <h3>{item.name}</h3>
            <h4 className="price">{"$" + item.price.slice(0, -2) + "." + item.price.slice(-2)}</h4>
            <hr/>
            <h4>Description</h4>
            <p>{item.description}</p>
            <div className="form">
              <select className="quantity" name="quanitity">
                {(() => {
                    let selectList = [];
                    for (let i = 1; i < 6; i++) {
                      selectList.push(<option value="i">{i}</option>)
                    }
                    return selectList;
                  }
                )()}
              </select>
              <button className="add-cart-button" onClick={purchaseItem}>Add to Cart</button>
            </div>
          </div>
        </div>

        <hr className="full-page-line"/>

        <div className="more-items">
          <h1>More Items</h1>
        </div>
      </div>
    ) : (<p>Loading...</p>)
  );
}

export default Item_Page;
