import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require('axios');

function Shop() {

  let item = {
    name: "Item Name",
    item_id: "Item ID #1",
  }
  let storage_quota = 0;
  let carted_items = [];

  // TODO: Create useEffect function call that runs checkContents 
  useEffect(() => {
    checkContents();
  });
  
  function addItem() {
    let stringifiedItem = JSON.stringify(item); // convert the JSON object "item" into a string using the JSON.stringify function call 
    let item_id = "JXYSDFH65F" + storage_quota; // generate a unique item ID for the local storage key 
    window.localStorage.setItem(item_id, stringifiedItem);
    carted_items.push(item_id);

    // increment the storage quota for each item added to the storage 
    if (storage_quota < 10)
      storage_quota++;
    else
      console.log("Max items reached in the storage.");
  
  }
  
  function checkContents() {
    // TODO: Transform this code into a loop that runs from 0 to 9 (inclusively) 
    // and logs if there exists an item in that local storage location or not 
    var i;
    for (i = 0; i < 10; i++) {
      let item_id = "JXYSDFH65F" + i; 
      let stringifiedItem = window.localStorage.getItem("JXYSDFH65F" + i); // pull the item back from the local storage
      if (!stringifiedItem) {
        console.log(false);
      } else {
        console.log(JSON.parse(stringifiedItem)); // convert the item back to a JSON object, and then log it 
      }
    }
  }

  return (
    <div>
      {/* () => addItem(arg1, arg2) */}
      <button type="button" onClick={addItem}>Item #1</button>
      <button type="button" onClick={addItem}>Item #2</button>
      <button type="button" onClick={addItem}>Item #3</button>
      <button type="button" onClick={checkContents}>Check Contents</button>
    </div>
  );
}

export default Shop;