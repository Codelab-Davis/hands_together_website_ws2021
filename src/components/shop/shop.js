import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require('axios');

function Shop() {
  // LOADING ALL ITEMS AND PAGINATION STARTS BELOW 
  const [itemArray, update] = useState({data: []});

  // log whatever item is clicked 
  function clicked(val) {
    console.log(val.name)
  }

  // initialize an empty array using UseState. Next value assignment, use setCurItems
  const [items, setCurItems] = useState([]);
  // intialize an integer that holds the value of the next index after slicing. 
  const [nextIndex, setNextIndex] = useState(0);
  // triggered on the "next" button click 
  function next() {
    if (itemArray.data[nextIndex] != undefined) // there are more items to see 
    {
      //slice the next 12 items in the data array. 
      setCurItems(itemArray.data.slice(nextIndex, nextIndex + 12));
      //set the next index to the first in the next set of 12 objects
      setNextIndex(nextIndex + 12);
    }
  }
    // triggered on the "previous" button click 
  function back() {
    if (itemArray.data[nextIndex - 13] != undefined) // there are previous items to go back to
    { 
      setCurItems(itemArray.data.slice(nextIndex - 24, nextIndex - 12));
      setNextIndex(nextIndex - 12);
    }
  }
  function check()
  {
    setCurItems(itemArray.data.slice(0,12));
    setNextIndex(12);
    console.log(items);
  }

  useEffect(()=>{
    axios.get('http://localhost:5000/items/get_all_items')
    .then( res => {
      console.log(res)
      // assign json data to itemArray 
      update({data: res.data})
    })
    .catch ( err => {console.log(err)})
  },[]) 

  // CARTING SYSTEM STARTS BELOW 
  let item = {
    name: "Item Name",
    item_id: "Item ID #1",
  }
  let storage_quota = 0;
  let carted_items = [];

  // TODO: Create useEffect function call that runs checkContents 
  // useEffect(() => {
  //   checkContents();
  // });
  
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
      {/* LOADING ALL ITEMS AND PAGINATION STARTS BELOW */}
      <nav aria-label="...">
        <ul className="pagination pagination-lg">
          <li className="page-item">
            <a className="page-link" tabIndex="-1" onClick={back}>Back</a>
          </li>
          <li className = "page-item disabled">
            <a className="page-link" tabIndex="-1" >Current</a>
          </li>
          <li className="page-item">
            <a className="page-link" tabIndex="-2" onClick={next}>Next</a>
          </li>
        </ul>
      </nav>

    { /* items is a concatenated array of the current 12 objects, 
      we iterate through all 12 of them and generate a div for each index with a unique link. 
     The button is solely for aesthetic purposes, it is not necesaary for redirection and can be reformatted otherwise  */}

      {items.map((itemIter, index) =>
        <div key={index}>
        <a href={`/:${itemIter._id}`}>
          <button onClick={() => clicked(itemIter)}>
            name: {itemIter.name}<br />
            id: {itemIter._id}<br />
            price: {itemIter.price}<br />
            date added: {itemIter.date_added}<br />
            images: [{itemIter.images}]<br />
          </button>
        </a>
        </div>
      )}
      {/* CARTING SYSTEM STARTS BELOW  */}
      {/* () => addItem(arg1, arg2) */}
      <button type="button" onClick={addItem}>Item #1</button>
      <button type="button" onClick={addItem}>Item #2</button>
      <button type="button" onClick={addItem}>Item #3</button>
      <button type="button" onClick={checkContents}>Check Contents</button>
    </div>
  );
}

export default Shop;