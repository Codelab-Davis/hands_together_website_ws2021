import react, { useState, useEffect } from "react"; 
import "../../css/view_shop_items.css";
import ViewSoldShopItems from "./view_sold_shop_items.js"; 
import Modal from 'react-modal';
import modal_x from "../../images/modal_x.png"; 
const axios = require('axios');

function ViewShopItems() { 
    // MODAL STATES, FUNCTIONS, AND STYLING START BELOW 
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [curItem, setCurItem] = useState(); 
    const [title, setTitle] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [quantity, setQuantity] = useState(''); 
    const [uploadMessage, setUploadMessage] = useState(""); 
    
    function openModal(item) { 
        setCurItem(item);
        setTitle(item.name); 
        setPrice(item.price.substring(0, item.price.length - 2) + "." + item.price.substring(item.price.length - 2)); 
        setDescription(item.description); 
        setQuantity(item.quantity);  
        setModalIsOpen(true); 
    } 
    
    function closeModal() { 
        setModalIsOpen(false); 
    } 

    // Functions to track typing changes in the input fields 
    function onTitleChange(event) { 
        if (event.target.value.length < 30) 
            setTitle(event.target.value); 
    } 

    function onPriceChange(event) { 
        setPrice(event.target.value); 
    } 

    function onDescriptionChange(event) { 
        if (event.target.value.length < 750) 
            setDescription(event.target.value); 
    } 

    function onQuantityChange(event) { 
        setQuantity(event.target.value); 
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
        axios.get('http://localhost:5000/items/get_all_items')
        .then( res => {
        console.log(res);
        // assign json data to itemArray 
        update({data: res.data});
        })
        .catch ( err => {console.log(err)})
    }, []) 

    useEffect(()=>{
        setNextIndex(((curPage - 1) * 6) + 6);
        setCurItems(itemArray.data.slice((curPage - 1) * 6, ((curPage - 1) * 6) + 6));
    }, [itemArray]) 

    function editItem() { 
        setUploadMessage("Uploading");

        if (title.length == 0 || description.length == 0 || quantity.length == 0 || price.length == 0) { 
            setUploadMessage("Sorry, all fields must be filled out."); 
            return; 
        }

        let item = {
            "name": title,
            "price": parseInt(price.substring(0, price.indexOf(".")) + "" + price.substring(price.indexOf(".") + 1)), 
            "description": description,
            "quantity": parseInt(quantity),
        }

        axios.post(`http://localhost:5000/items/update_item/${curItem._id}`, item) 
            .then(res => {
                setUploadMessage("Item successfully edited."); 
                let new_items = [];  
                for (let i = 0; i < items.length; i++) { 
                    if (items[i]._id != curItem._id) 
                        new_items.push(items[i]); 
                    else { 
                        let curItemCopy = curItem; 
                        curItemCopy.name = item.name; 
                        curItemCopy.price = item.price.toString().substring(0, item.price.toString().indexOf('.')) + item.price.toString().substring(item.price.toString().indexOf('.') + 1); 
                        curItemCopy.description = item.description; 
                        curItemCopy.quantity = item.quantity; 
                        new_items.push(curItemCopy); 
                        setCurItem(curItemCopy); 
                    } 
                } 
                setCurItems(new_items); 
            })
            .catch(err => { 
                setUploadMessage("Sorry something went wrong editing your item."); 
                console.log('err', err);  
            })
    } 

    function deleteCurItem() { 
        axios.delete(`http://localhost:5000/items/delete_item/${curItem._id}`) 
            .then(() => {
                let new_items = [];  
                for (let i = 0; i < items.length; i++) { 
                    if (items[i]._id != curItem._id) 
                        new_items.push(items[i]); 
                } 
                setCurItems(new_items); 
                closeModal(); 
            }) 
            .catch((error) => { 
                console.log("Error deleting event", error); 
            }) 
    } 

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
                <h3>Edit Item (please note that images cannot be edited - you must make a new listing)</h3> 
                <div> 
                    <p style={{marginTop: "1rem"}}>Edit title for item, price, description, and quantity. <strong>The price must be formatted as xx.xx. If it is not, the item will not be purchaseable.</strong></p>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-10 col-md-6">
                            <input type="text" placeholder="Item Title" value={title} onChange={onTitleChange} /> 
                            <p>Max 30 characters</p>
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-6 col-md-2">
                            <input type="text" placeholder="12.99" value={price} onChange={onPriceChange} /> 
                            <p>Formatting: 12.99</p>
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-10 col-md-6">
                            <textarea style={{height: "9rem"}} type="text" placeholder="Item Description" value={description} onChange={onDescriptionChange} /> 
                            <p>Max 750 characters</p>
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-6 col-md-2">
                            <input type="text" placeholder="Quantity: 5" value={quantity} onChange={onQuantityChange} /> 
                            <p>Max 10 quantity</p>
                        </div>
                    </div> 
                </div> 
                <div className="col-12"> 
                    <button className="submit-button hands-together-button" onClick={editItem}>Update Item</button>
                    <p>{uploadMessage}</p> 
                </div>
                <h3 style={{marginTop: "3rem"}}>Would you like to permenantly delete this item?</h3> 
                <button className="confirm-button" onClick={deleteCurItem}>Yes</button>
            </Modal>
            <div className="row no-gutters view-container"> 
                <h1 className="title-text">Active Listings</h1>
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
                                <div className="item-container">
                                <a className="wrapper-link"></a>
                                <div className="item-image" style={{backgroundImage: `url(${itemIter.images[0]})`}}></div>
                                <div className="add-to-cart">
                                    <a className="bold" onClick={() => openModal(itemIter)}>View Item Options</a>
                                </div>
                                <div className="item-info">
                                    <div className="name-price">
                                    <p className="name bold">{itemIter.name}</p>
                                    <p>Quantity: {itemIter.quantity}</p>
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
            <ViewSoldShopItems />
        </div>
    );
}

export default ViewShopItems; 