import React, { Component, useState } from 'react';
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";

function OrderSummary() {
  let transaction_id = useParams();
  const [transaction_data, set_transaction_data] = useState();
  const [valid, set_valid] = useState(false);

  useEffect(() => {
    console.log(transaction_id);
    axios.get("http://localhost:5000/sold_items/get_sale/", { params: { transaction_id: transaction_id }})
      .then(res => { 
        set_transaction_data(res.data);
        set_valid(true);
        console.log(res.data);
      })
  }, []) /* Run useEffect only once */

  return(
    <div>
      <h1>This is the order summary page</h1>
      {
        valid &&
        transaction_data.map((data, key) =>
          <div>
            <p>Name: {data.name}</p>
            <p>Images: {data.images}</p>
            <p>Date Sold: {data.date_sold}</p>
            <p>Tracking Link: {data.tracking_link}</p>
            <p>Shipping Address: {data.shipping_address.city}
              {data.shipping_address.country}
              {data.shipping_address.line1}
              {data.shipping_address.line2}
              {data.shipping_address.postal_code}
              {data.shipping_address.state}</p>
          </div>
        )
      }
    </div>
  )
}

export default OrderSummary;