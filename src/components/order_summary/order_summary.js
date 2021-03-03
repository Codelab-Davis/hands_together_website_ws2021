import React, { Component } from 'react';
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";

function OrderSummary() {
  let transaction_id = useParams();

  useEffect(() => {
    console.log(transaction_id);
    axios.get("http://localhost:5000/sold_items/get_sale", { params: { transaction_id: transaction_id }})
      .then(res => { 
        console.log(res.data);
      })
  })

  return(
    <h1>This is the order summary page</h1>
  )
}

export default OrderSummary;