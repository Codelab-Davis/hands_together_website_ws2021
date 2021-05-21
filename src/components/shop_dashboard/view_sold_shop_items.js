import react, { useState, useEffect } from "react"; 
import "../../css/view_shop_items.css";
import Modal from 'react-modal'; 
const axios = require('axios');

function ViewSoldShopItems() {
    // MODAL STATES, FUNCTIONS, AND STYLING START BELOW 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState();  
    
    function openModal(item) {
        setModalIsOpen(true);
        setSelectedItem(item); 
    }
    
    function closeModal(){
        setModalIsOpen(false);
    }

    function logCurItemID() { 
        console.log(selectedItem); 
    }

    const customModalStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            width                 : '50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    function cancelOrder() {
        axios.post("http://localhost:5000/stripe/cancel_order/" + selectedItem.transaction_id)
         .then(res => {
             console.log(res);
         })
    }


    // LOADING ALL ITEMS AND PAGINATION STARTS BELOW 
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
    // log whatever item is clicked 
    function clicked(val) {
        console.log(val.name)
    }
    function getFormattedPrice(price) {
        return ("$" + price.slice(0, -2) + "." + price.slice(-2));
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/sold_items/get_sold_items')
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

    return ( 
        <div className="container-fluid p-0">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Checkout Delivery Address Modal"
                style={customModalStyles}
            >
                <button onClick={() => logCurItemID()}>Open up your console and click me to see the current item's information</button>
                <button onClick={() => cancelOrder()}>Cancel Order </button>
            </Modal> 
            <div className="row no-gutters view-container"> 
                <h1 className="title-text">Sold Items</h1>
                <p className="title-text"><br/>{
                    "Showing " + (12 * (curPage - 1) + 1) + "-" 
                    + Math.min((12 * curPage), itemArray.data.length) 
                    + " of " + itemArray.data.length + " results"
                }</p> 
                <div className="row">
                    { items ?
                        items.map((itemIter, index) =>
                        <div className="col-md-4" key={index}>
                            <div className="item-container">
                            <div className="item-info" style={{cursor: "pointer"}} onClick={() => openModal(itemIter)}> 
                                <div className="name-price">
                                <p className="name bold">{itemIter.name}</p>
                                <p className="price">{getFormattedPrice(itemIter.price)}</p>
                                </div>
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
        </div>
    );
}

export default ViewSoldShopItems; 