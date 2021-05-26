import react, { useState, useEffect } from "react"; 
import "../../css/view_shop_items.css";
import Modal from 'react-modal'; 
import modal_x from "../../images/modal_x.png"; 
const axios = require('axios');

function ViewSoldShopItems() {
    // MODAL STATES, FUNCTIONS, AND STYLING START BELOW 
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [selectedItem, setSelectedItem] = useState(); 
    const [trackingLink, setTrackingLink] = useState(''); 
    const [amount, setAmount] = useState(0); 
    const [cancelledItems, setCancelledItems] = useState([]); 
    const [uploadMessage, setUploadMessage] = useState(""); 
    
    function openModal(item) { 
        setSelectedItem(item); 
        setTrackingLink(item[0].tracking_link); 
        // let quantitiesCancelledCopy = []; 
        // let namesCancelledCopy = []; 
        // for (let i = 0; i < item.length; i++) { 
        //     quantitiesCancelledCopy.push(0); 
        //     namesCancelledCopy.push(""); 
        // } 
        // setQuantitiesCancelled(quantitiesCancelledCopy); 
        // setNamesCancelled(namesCancelledCopy); 
        setCancelledItems([]); 
        setAmount(0); 
        setModalIsOpen(true); 
    } 
    
    function closeModal(){
        setModalIsOpen(false);
    }

    function logCurItemID() { 
        console.log(selectedItem); 
    } 

    function onTrackingLinkChange(event) { 
        setTrackingLink(event.target.value); 
    } 

    function adjustCancelledItems(item) { 
        for (let i = 0; i < cancelledItems.length; i++) { 
            if (item.name == cancelledItems[i].title) { 
                
            }
        } 
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

    function updateTracking() { 
        if (trackingLink.length == 0) { 
            setUploadMessage("Please provide a tracking link before submitting."); 
            return; 
        } 
        let newSelectedItem = selectedItem; 
        for (let i = 0; i < newSelectedItem.length; i++) { 
            newSelectedItem[i].tracking_link = trackingLink; 
            axios.put("https://db.handstogether-sa.org/sold_items/update_tracking_link/", newSelectedItem[i], { withCredentials: true }) 
            .then(res => { 
                let new_items = [];  
                for (let i = 0; i < items.length; i++) { 
                    if (items[i][0]._id != selectedItem[0]._id) 
                        new_items.push(items[i]); 
                    else { 
                        new_items.push(newSelectedItem); 
                        setSelectedItem(newSelectedItem); 
                        setUploadMessage("Successfully updated tracking link"); 
                    } 
                } 
            })
            .catch(err => { 
                console.log("Error updating tracking link", err); 
                setUploadMessage("Failed to update tracking link. Please reload the page."); 
            })
        } 
    } 

    function cancelOrder() { 
        let cancelled_info = { 
            id: selectedItem.transaction_id, 
            amount: amount, 
            cancelled_items: cancelledItems,
        }
        axios.post("https://db.handstogether-sa.org/stripe/cancel_order/" + cancelled_info, { withCredentials: true }) 
         .then(res => {
            // need to update the item as cancelled in the DB here 
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
        //slice the next 6 items in the data array. 
        setCurItems(itemArray.data.slice(nextIndex, nextIndex + 6));
        //set the next index to the first in the next set of 6 objects
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
    // log whatever item is clicked 
    function clicked(val) {
        console.log(val.name)
    }
    function getFormattedPrice(price) {
        return ("$" + price.slice(0, -2) + "." + price.slice(-2));
    }

    useEffect(()=>{
        axios.get('https://db.handstogether-sa.org/sold_items/get_sold_items')
        .then( res => { 
        console.log(res);
        // assign json data to itemArray 
        let new_data = []; 
        let i = 0; 
        while (i < res.data.length) { 
            let temp_data = []; 
            temp_data.push(res.data[i]); 
            i++; 
            while (i < res.data.length && temp_data[0].transaction_id == res.data[i].transaction_id) { 
                temp_data.push(res.data[i]); 
                i++; 
            } 
            new_data.push(temp_data); 
        } 
        console.log(new_data); 
        update({data: new_data});
        })
        .catch ( err => {console.log(err)})
    }, []) 

    useEffect(()=>{
        setNextIndex(((curPage - 1) * 6) + 6);
        setCurItems(itemArray.data.slice((curPage - 1) * 6, ((curPage - 1) * 6) + 6));
    }, [itemArray]) 

    return ( 
        <div className="container-fluid p-0">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Checkout Delivery Address Modal"
                style={customModalStyles}
            >
                <div className="col-12" align="right">
                    <img src={modal_x} onClick={closeModal} style={{cursor: "pointer"}} /> 
                </div>
                <div className="row">
                    <div className="col-6">
                        <h2>Items Sold</h2>
                        <div className="col-12">
                            <div className="row"> 
                                { selectedItem ? 
                                    selectedItem.map((itemIter, index) => 
                                        <div className="col-6" key={index}> 
                                            <h2>{itemIter.name}</h2> 
                                            <h3>Quantity: {itemIter.quantity}</h3> 
                                            <h3>Price: {getFormattedPrice(itemIter.price)}</h3> 
                                            <p>Cancelled? <strong>{itemIter.cancelled ? "This item has been fully or partially canceled" : "No"}</strong></p> 
                                        </div> 
                                    ) 
                                    : <p>Loading...</p>
                                }
                            </div> 
                        </div> 
                    </div>
                    <div className="col-6">
                        <h2>Update Tracking Link</h2>
                        <div className="row no-gutters listing-input"> 
                            <div className="col-12">
                                <input type="text" placeholder="Tracking Link" value={trackingLink} onChange={onTrackingLinkChange} /> 
                            </div>
                        </div>
                        <button className="submit-button hands-together-button" onClick={updateTracking}>Update</button> 
                        <h2>Cancel Order</h2>
                        <div className="col-12">
                            <div className="row"> 
                            <h2>To issue a full or partial cancellation, please visit your Stripe dashboard as we implement cancellations through the admin dashboard.</h2>
                                {/* { selectedItem ? 
                                    selectedItem.map((itemIter, index) => 
                                    <>
                                        <div className="col-6" key={index}> 
                                            <h3>{itemIter.name}</h3> 
                                        </div> 
                                        <div className="col-6" style={{marginBottom: "1rem"}} key={index}> 
                                            <input type="checkbox" onChange={() => adjustCancelledItems(itemIter)} /> 
                                        </div> 
                                    </>
                                    ) 
                                    : <p>Loading...</p>
                                } */}
                            </div> 
                        </div> 
                        <button className="submit-button hands-together-button" onClick={() => cancelOrder()}>Cancel Items</button>
                        <p>{uploadMessage}</p>
                    </div> 
                </div>
            </Modal> 
            <div className="row no-gutters view-container"> 
                <h1 className="title-text">Sold Items</h1>
                <p className="title-text"><br/>{
                    "Showing " + (6 * (curPage - 1) + 1) + "-" 
                    + Math.min((6 * curPage), itemArray.data.length) 
                    + " of " + itemArray.data.length + " results"
                }</p> 
                <div className="col-12">
                    <div className="row">
                        { items ?
                            items.map((itemIter, index) =>
                            <div className="col-md-4" key={index}>
                                {console.log(itemIter)} 
                                <div className="item-container" style={{marginBottom: "3rem"}}> 
                                    <h3>Date Sold: {new Date(itemIter[0].date).toLocaleString('en-US')}</h3> 
                                    <h3>Transaction ID: {itemIter[0].transaction_id}</h3> 
                                    <h3>Shipping Info</h3>
                                    <p>Name: {itemIter[0].shipping_address.name}</p> 
                                    <p>Address: {itemIter[0].shipping_address.address.line1}</p> 
                                    <p>Address 2: {itemIter[0].shipping_address.address.line2}</p> 
                                    <p>{itemIter[0].shipping_address.address.city}, {itemIter[0].shipping_address.address.state}, {itemIter[0].shipping_address.address.postal_code}</p> 
                                    <p>Tracking Link: {itemIter[0].tracking_link}</p> 
                                    <button className="submit-button hands-together-button" onClick={() => openModal(itemIter)}>Edit Order</button> 
                                </div> 
                            </div>
                            )
                            : <p>Loading...</p>
                        }
                    </div>
                </div>

                <nav aria-label="pages">
                <button className="back-button" tabIndex="-1" onClick={back}>Back</button>
                {(() => {
                    // Generate one button for each page
                    let pageList = [];
                    for (let i = 0; i < Math.ceil(parseFloat(itemArray.data.length) / 6); i++) {
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