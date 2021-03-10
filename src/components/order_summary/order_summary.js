import React, { Component, useState } from 'react';
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";

function OrderSummary() {
  let transaction_id = useParams();
  const [transaction_data, set_transaction_data] = useState();

  useEffect(() => {
    console.log(transaction_id);
    axios.get("http://localhost:5000/sold_items/get_sale", { params: { transaction_id: transaction_id }})
      .then(res => { 
        transaction_data = res.data;
        console.log(res.data);
      })
  })

  return(
    <>
      <h1>This is the order summary page</h1>
      {
        // transaction_data.map((data, key) =>
        //   <>
        //     <p>data.name</p>
        //     <p>data_added.name</p>
        //   </>
        // )
      }
    </>
  )
}

export default OrderSummary;