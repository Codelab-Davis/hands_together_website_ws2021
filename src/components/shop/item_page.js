import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/item_page.css";
import { useParams } from "react-router"
import { useEffect, useState } from 'react';
import SoldItemsTestRoutes from "../shop_dashboard/sold_items_test_routes";
const axios = require('axios');

function Item_Page(props) {
  let id = useParams();

  const [item, setItem] = useState();
  const [imageLink, setImageLink] = useState("");
  const [selectQuantity, setSelectQuantity] = useState(1);

  useEffect(() => {
    axios.get('https://db.handstogether-sa.org/items/get_item/' + id.id)
      .then((res) => {
        setItem(res.data);
        // console.log(res);
      })
  }, [])
  useEffect(() => {
    if (item)
      setImageLink(item.images[0]);
  }, [item]);

  function purchaseItem() {
    const req = {
      amount: 2000,
      success_url: "https://handstogether-sa.org/order_summary/",
      cancel_url: "https://handstogether-sa.org/",
      item_id: id.id,
      type: "purchase"
    }
    var stripe = window.Stripe('pk_test_51IMhDjDACjkjrvMm0D7gtuvvHOCY8Z9dGTjwVFxFcmWHlGfjn9CGEdvyvs5vMQrAQDwmBcELSzSb2kTNf65eyJkw00AXucR70x')
    axios.post('https://db.handstogether-sa.org/stripe/create-checkout-session/', req) 
     .then(session => stripe.redirectToCheckout({sessionId: session.data.id}))
     .catch(error => console.log(error))
  }

  function handleImageClick(index) {
    setImageLink(item.images[index]);
    for (let i = 0; i < item.images.length; i++) {
      document.getElementById(`image${i}`).classList.remove("selected-image");
    }
    document.getElementById(`image${index}`).classList.add("selected-image");
  }

  function updateQuantity(e) {
    setSelectQuantity(e.target.value);
  }

  function showItemAddedMessage() {
    const itemAddedMessage = document.getElementById("item-added-message");
    itemAddedMessage.classList.remove("hidden");
    setTimeout(() => itemAddedMessage.classList.add("hidden"), 2000);
  }

  //
  // LOADING ALL ITEMS AND PAGINATION STARTS BELOW 
  //
  const [itemArray, update] = useState({data: []});
  // initialize an empty array using UseState. Next value assignment, use setCurItems
  const [items, setCurItems] = useState([]);
  // intialize an integer that holds the value of the next index after slicing. 
  const [nextIndex, setNextIndex] = useState(0);
  const [curPage, setCurPage] = useState(1);

  // triggered on the "next" button click 
  function next() {
    if (itemArray.data[nextIndex] != undefined) { // there are more items to see 
      //slice the next 12 items in the data array. 
      setCurItems(itemArray.data.slice(nextIndex, nextIndex + 6));
      //set the next index to the first in the next set of 12 objects
      setNextIndex(nextIndex + 6);
      setCurPage(curPage + 1);
    }
  }
  // triggered on the "back" button click 
  function back() {
    if (itemArray.data[nextIndex - 7] != undefined) { // there are previous items to go back to
      setCurItems(itemArray.data.slice(nextIndex - 12, nextIndex - 6));
      setNextIndex(nextIndex - 6);
      setCurPage(curPage - 1);
    }
  }
  function handlePageClick(event) {
    setCurPage(event.target.id);
    setNextIndex(((event.target.id - 1) * 6) + 6);
    setCurItems(itemArray.data.slice((event.target.id - 1) * 6, ((event.target.id - 1) * 6) + 6));
  }

  function check() {
    setCurItems(itemArray.data.slice(0,6));
    setNextIndex(6);
    // console.log(items);
  }
  // log whatever item is clicked 
  function clicked(val) {
    // console.log(val.name)
  }
  function getFormattedPrice(price) {
    return ("$" + price.slice(0, -2) + "." + price.slice(-2));
  }

  useEffect(()=>{
    axios.get('https://db.handstogether-sa.org/items/get_all_items')
    .then( res => {
      // assign json data to itemArray 
      update({data: res.data});
    })
    .catch ( err => {console.log(err)})
  }, []) 

  useEffect(()=>{
    setNextIndex(((curPage - 1) * 6) + 6);
    setCurItems(itemArray.data.slice((curPage - 1) * 6, ((curPage - 1) * 6) + 6));
  }, [itemArray]) 

  // 
  // CARTING SYSTEM STARTS BELOW 
  //
  function quickAddItem(newItem_, qty) {
    // Initialize storageQuota if no items have been added yet
    let storageQuota = window.localStorage.getItem("QUOTA");
    if (!storageQuota) {
      window.localStorage.setItem("QUOTA", 0);
      storageQuota = 0;
    }

    let quantityAvailable = newItem_.quantity; // Max number of items someone can buy
    let newItem = JSON.parse(JSON.stringify(newItem_));
    newItem.quantity = parseInt(qty); // Quantity that is being added to cart

    // Increment the storage quota for each item added to the storage 
    // Currently allows for 10 unique items, but more than 10 items if they are duplicates 
    if (storageQuota < 10) {
      // Check if the item is already in localStorage
      // Increment quantity if so
      let itemIsInStorage = false;
      for (let i = 0; i < storageQuota; i++) {
        let storageItem = JSON.parse(window.localStorage.getItem("JXYSDFH65F" + i));
        if (newItem._id == storageItem._id) {
          if (storageItem.quantity + newItem.quantity <= quantityAvailable) {
            storageItem.quantity += parseInt(qty);
          } else {
            storageItem.quantity = quantityAvailable;
            // console.log(`The max quantity of this item, ${quantityAvailable}, has been added to cart`);
          }
          window.localStorage.setItem("JXYSDFH65F" + i, JSON.stringify(storageItem));
          itemIsInStorage = true;
          break;
        }
      }
      // Add a new item if it isn't already in localStorage
      if (!itemIsInStorage) {
        let lsItemId = "JXYSDFH65F" + storageQuota; // generate a unique item ID for the local storage key 
        window.localStorage.setItem(lsItemId, JSON.stringify(newItem));
  
        let new_quota = storageQuota;
        new_quota++;
        window.localStorage.setItem("QUOTA", new_quota);
      }
    }
    else
      console.log("Max items reached in the storage.");
  }

  return ( 
    item ? (
      <div id="item-page-wrapper">
        <div className="header">
          <h1 className="header-text">{item.name}</h1>
        </div>

        <div className="row no-gutters item-info">
          <div className="col-sm-6 row no-gutters flex-nowrap">
            <div className="col-2 side-image-container">
              {item.images.map((image, index) =>
                <div id={`image${index}`} 
                  onClick={() => handleImageClick(index)} 
                  className={index == 0 ? "side-image selected-image" : "side-image"}  
                  style={{backgroundImage: `url(${image})`}}
                ></div>
              )}
            </div>

            <div className="col-10 main-image-container">
              <div className="main-image" style={{backgroundImage: `url(${imageLink})`}}></div>
            </div>
          </div>
          
          <div className="col-sm-6 right">
            <h3>{item.name}</h3>
            <h4 className="price">{"$" + item.price.slice(0, -2) + "." + item.price.slice(-2)}</h4>
            <hr/>
            <h4>Description</h4>
            <p>{item.description}</p>
            <div className="form">
              <select value={selectQuantity} onChange={updateQuantity} className="quantity" name="quantity">
                {(() => {
                    let selectList = [];
                    for (let i = 1; i <= item.quantity; i++) {
                      selectList.push(<option value={i}>{i}</option>)
                    }
                    return selectList;
                  }
                )()}
              </select>
              <button className="add-cart-button" onClick={() => {quickAddItem(item, selectQuantity); showItemAddedMessage();}}>Add to Cart</button>
              <p id="item-added-message" className="hidden">Item(s) added!</p>
            </div>
          </div>
        </div>

        <hr className="full-page-line"/>

        <div className="more-items">
          <h1>More Items</h1>
        </div>

        <div className="row">
          { items ?
            items.map((itemIter, index) =>
              <div className="col-sm-6 col-md-4" key={index}>
                <div className="item-container">
                  <a className="wrapper-link" href={`/shop/${itemIter._id}`} onClick={() => clicked(itemIter)}></a>
                  <div className="item-image" style={{backgroundImage: `url(${itemIter.images[0]})`}}></div>
                  <div className="add-to-cart">
                    <a className="bold" onClick={() => quickAddItem(itemIter, 1)}>Add to Cart</a>
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

        <nav aria-label="pages" align="center">
          <button className="back-button" tabIndex="-1" onClick={back}>Back</button>
          {(() => {
            // Generate one button for each page
            let pageList = [];
            for (let i = 0; i < Math.ceil(parseFloat(itemArray.data.length) / 6); i++) {
              pageList.push(
                <button 
                  className={"page-num-button " + ((curPage == i + 1) ? "selected-page-button bold" : "")} 
                  key={i} id={i + 1} 
                  onClick={handlePageClick}
                >
                  {i + 1}
                </button>
              )
            }
            return pageList;
          })()}
          <button className="next-button" tabIndex="-2" onClick={next}>Next</button>
        </nav>
      </div>
    ) : (<p>Loading...</p>)
  );
}

export default Item_Page;
