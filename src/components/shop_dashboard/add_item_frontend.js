import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/add_item_frontend.css"; 

function AddItemFrontend() { 

    // States to track what is in the input fields 
    const [title, setTitle] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [quantity, setQuantity] = useState(''); 

    // Functions to track typing changes in the input fields 
    function onTitleChange(event) { 
        setTitle(event.target.value); 
    } 

    function onPriceChange(event) { 
        setPrice(event.target.value); 
    } 

    function onDescriptionChange(event) { 
        setDescription(event.target.value); 
    } 

    function onQuantityChange(event) { 
        setQuantity(event.target.value); 
    } 

    return ( 
        // I use bootstrap rows to fluidly force content onto new lines throughout 
        <div className="container-fluid p-0"> 
            <div className="row no-gutters"> 
                <h1 className="title-text">Create new listing</h1> 

                {/* "Photos" box */}
                <div className="listing-box"> 
                    <h2>Photos</h2> 
                    <p>Add up to four photos of your product so buyers can see all the details. </p>
                     {/* This is a great example of when NOT to use columns in bootstrap. We can simply get all of our elements 
                         to show up in a line together evenly spaced apart by using justify-content in our CSS file after putting 
                         them in a row together  */}
                    <div className="row no-gutters photo-container"> 
                        <div className="add-a-photo" /> 
                        <div className="photo-preview" /> 
                        <div className="photo-preview" /> 
                        <div className="photo-preview" /> 
                        <div className="photo-preview" /> 
                    </div> 
                    <p className="bold photo-description-margin">The first photo you upload will be the primary listing photo. This will be the photo displayed on the shop home page. </p>
                </div> 
                
                {/* "Create Listing" box */}
                <div className="listing-box"> 
                    <h2>Create Listing</h2> 
                    <p>Edit title for item, price, description, and quantity.</p> 
                    {/* This is a great example of when to use columns. We want each input box to always take up 
                        a specific portion of the screen based on the device size 
                        I use col-10 and col-6 to say what the width should be on xs and sm devices, and 
                        col-md-6 and col-md-2 to say what it should look like on md and larger sized devices */}
                    <div className="row no-gutters listing-input"> 
                        <div className="col-10 col-md-6">
                            <input type="text" placeholder="Title of item" value={title} onChange={onTitleChange} /> 
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-6 col-md-2">
                            <input type="text" placeholder="$ 00.00" value={price} onChange={onPriceChange} /> 
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-10 col-md-6">
                            <input type="text" placeholder="Describe your item" value={description} onChange={onDescriptionChange} /> 
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-6 col-md-2">
                            <input type="text" placeholder="Quantity: 0" value={quantity} onChange={onQuantityChange} /> 
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
} 

export default AddItemFrontend;