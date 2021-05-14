import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/shop.css";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
const axios = require('axios');

function Shop(props) {
  //
  // LOADING ALL ITEMS AND PAGINATION STARTS BELOW 
  //
  const [itemArray, update] = useState({data: []});
  // initialize an empty array using UseState. Next value assignment, use setCurItems
  const [items, setCurItems] = useState([]);
  // intialize an integer that holds the value of the next index after slicing. 
  const [nextIndex, setNextIndex] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [sortOption, setSortOption] = useState("newest");

  // triggered on the "next" button click 
  function next() {
    if (itemArray.data[nextIndex] != undefined) { // there are more items to see 
      //slice the next 12 items in the data array. 
      setCurItems(itemArray.data.slice(nextIndex, nextIndex + 12));
      //set the next index to the first in the next set of 12 objects
      setNextIndex(nextIndex + 12);
      setCurPage(curPage + 1);
    }
  }
  // triggered on the "back" button click 
  function back() {
    if (itemArray.data[nextIndex - 13] != undefined) { // there are previous items to go back to
      setCurItems(itemArray.data.slice(nextIndex - 24, nextIndex - 12));
      setNextIndex(nextIndex - 12);
      setCurPage(curPage - 1);
    }
  }
  function handlePageClick(event) {
    setCurPage(event.target.id);
    setNextIndex(((event.target.id - 1) * 12) + 12);
    setCurItems(itemArray.data.slice((event.target.id - 1) * 12, ((event.target.id - 1) * 12) + 12));
  }

  function check() {
    setCurItems(itemArray.data.slice(0,12));
    setNextIndex(12);
    console.log(items);
  }
  // log whatever item is clicked 
  function clicked(val) {
    console.log(val.name)
  }
  function getFormattedPrice(price) {
    return ("$" + price.slice(0, -2) + "." + price.slice(-2));
  }

  useEffect(()=>{
    axios.get('http://localhost:5000/items/get_all_items')
    .then( res => {
      console.log(res);
      // assign json data to itemArray 
      update({data: res.data});
    })
    .catch ( err => {console.log(err)})
  }, []) 

  useEffect(()=>{
    setNextIndex(((curPage - 1) * 12) + 12);
    setCurItems(itemArray.data.slice((curPage - 1) * 12, ((curPage - 1) * 12) + 12));
  }, [itemArray]) 

  // 
  // SORTING METHODS
  //
  function handleSortChange(e) {
    setSortOption(e.target.value);
  }
  useEffect(()=>{
    sortItems();
  }, [sortOption]) 

  function sortItems() {
    let tempItems = itemArray.data;
    if (sortOption == "lowtohigh")
      tempItems.sort(sortLowToHigh);
    else if (sortOption == "hightolow")
      tempItems.sort(sortHighToLow);
    else
      tempItems.sort(sortNewest);
    update({data: tempItems})
  }
  function sortLowToHigh(a, b) {
    if (a.price < b.price)
      return -1;
    else if (a.price > b.price)
      return 1;
    return 0;
  }
  function sortHighToLow(a, b) {
    if (a.price > b.price)
      return -1;
    else if (a.price < b.price)
      return 1;
    return 0;
  }
  function sortNewest(a, b) {
    if (a.date_added < b.date_added)
      return -1;
    else if (a.date_added > b.date_added)
      return 1;
    return 0;
  }

  // 
  // CARTING SYSTEM STARTS BELOW 
  //
  function addItem(item) {
    let stringifiedItem = JSON.stringify(item); // convert the JSON object "item" into a string using the JSON.stringify function call 
    let item_id = "JXYSDFH65F" + props.storageQuota; // generate a unique item ID for the local storage key 
    window.localStorage.setItem(item_id, stringifiedItem);

    let carted_items = props.cartedItems;
    carted_items.push(item_id);
    props.setCartedItems(carted_items);

    // increment the storage quota for each item added to the storage 
    if (props.storageQuota < 10) {
      let storage_quota = props.storageQuota;
      storage_quota++;
      props.setStorageQuota(storage_quota);
    }
    else
      console.log("Max items reached in the storage.");
  }
  
  function checkContents() {
    var i;
    for (i = 0; i < 10; i++) {
      let item_id = "JXYSDFH65F" + i; 
      let stringifiedItem = window.localStorage.getItem("JXYSDFH65F" + i); // pull the item back from the local storage
      if (!stringifiedItem) {
        console.log(false); // item wasn't found
      } else {
        console.log(JSON.parse(stringifiedItem)); // convert the item back to a JSON object, and then log it 
      }
    }
  }

  return (
    <div>
      {/* 
        LOADING ALL ITEMS AND PAGINATION STARTS BELOW 
      */}

      { /* items is a concatenated array of the current 12 objects, 
        we iterate through all 12 of them and generate a div for each index with a unique link. 
        The button is solely for aesthetic purposes, it is not necesaary for redirection and can be reformatted otherwise  */}

      <div id="shop-wrapper">
        <div className="header">
          <h1>Our Shop</h1>
          <h3>
            Our handcrafted gifts for good are made by the parents in the Morning Garden Program. The Morning Garden Program provides the highest quality education to the children of working families. Each artisan can express their unique style in the creation of these hand-crafted goods. The embroidery styles are inspired by traditional techniques of various Latin American regions. All items are made of the best quality felt and 100% DMC cotton thread.
            <br/><br/>Proceeds from the sale of these items help our families gain economic stability and improve the emotional and physical lives of their families. 80% of the proceeds of these products are given directly to the artisan. The remaining 20% is used for the purchase of materials.
          </h3>
        </div>

        <div className="legend">
          <p>{
            "Showing " + (12 * (curPage - 1) + 1) + "-" 
            + Math.min((12 * curPage), itemArray.data.length) 
            + " of " + itemArray.data.length + " results"
          }</p>
          <select name="sort" id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="lowtohigh">Price: Low to High</option>
            <option value="hightolow">Price: High to Low</option>
          </select>
        </div>

        <div className="row">
          { items ?
            items.map((itemIter, index) =>
              <div className="col-md-4" key={index}>
                <div className="item-container">
                  <a className="wrapper-link" href={`/shop/${itemIter._id}`} onClick={() => clicked(itemIter)}></a>
                  <div className="item-image" style={{backgroundImage: `url(${itemIter.images[0]})`}}></div>
                  <div className="add-to-cart">
                    <a className="bold" onClick={() => addItem(itemIter)}>Add to Cart</a>
                  </div>
                  <div className="item-info">
                    <div className="name-price">
                      <p className="name bold">{itemIter.name}</p>
                      <p className="price">{getFormattedPrice(itemIter.price)}</p>
                    </div>
                    <p className="caption description">{itemIter.description.length < 100 ? itemIter.description : itemIter.description.slice(0, 100) + "..."}</p>
                  </div>
                </div>
              </div>
            )
            : <p>Loading...</p>
          }
        </div>

        <nav aria-label="pages">
          <button className="back-button" tabIndex="-1" onClick={back}>Back</button>
          {(() => {
            // Generate one button for each page
            let pageList = [];
            for (let i = 0; i < Math.ceil(parseFloat(itemArray.data.length) / 12); i++) {
              pageList.push(
                <button className="page-num-button" key={i} id={i + 1} onClick={handlePageClick}>{i + 1}</button>
              )
            }
            return pageList;
          })()}
          <button className="next-button" tabIndex="-2" onClick={next}>Next</button>
        </nav>
      </div>

      {/* <button type="button" onClick={checkContents}>Check Contents</button> */}
    </div>
  );
}

export default Shop;