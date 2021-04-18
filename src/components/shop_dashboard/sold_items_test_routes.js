import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require('axios');

function SoldItemsTestRoutes() { 

    // Note that these are all static requests. 
    // You'll know they were successful on a 
    // console print after a button click. 

    let test_item = { 
      name: "Test Item for Abhay", 
      date_added: Date.now(), 
      price: '37.23', 
      images: ['img1fakeline', 'img2fakelink', 'img3fakelink'], 
      date_sold: Date.now(), 
      transaction_id: 'sdfsdfrs34345345345xdcsdf345435345', 
      tracking_link: "test_link",
      cancelled: false,
      shipping_address: new Map(), 
    } 

    function addItem() { 
        axios.post('http://localhost:5000/sold_items/add_item', test_item)
          .then(res => {
            console.log(res);
        })
    } 

    function editItem() { 
        let new_test_item = test_item 
        new_test_item.id = '607bc1788e294828789c4923'; 
        new_test_item.name = "Abhay's new test item" 
        axios.put('http://localhost:5000/sold_items/update_item', new_test_item)
        .then(res => {
          console.log(res);
      })
    } 

    function getSale() { 
        axios.get('http://localhost:5000/sold_items/get_sale/607bc1788e294828789c4923',)
        .then( res => {
          console.log(res)
        }) 
    }

    function getSoldItems() { 
        axios.get('http://localhost:5000/sold_items/get_sold_items') 
            .then(res => { 
                console.log(res); 
            }) 
    }

    return ( 
        <div>
            <button onClick={addItem}>Add Item</button> 
            <button onClick={editItem}>Update Item</button> 
            <button onClick={getSale}>Get Sale</button> 
            <button onClick={getSoldItems}>Get Sold Items</button> 
        </div>
    ); 
} 

export default SoldItemsTestRoutes; 