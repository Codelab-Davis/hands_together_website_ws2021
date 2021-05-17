import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/add_shop_item.css";
import camera from "../../images/camera.png"; 
const axios = require('axios'); 

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
    
    const [uploadMessage, setUploadMessage] = useState("");
    const [imgFiles, setImgFiles] = useState([]);

    function handleImgUpload(event) {
        if (event.target.files.length > 0 && event.target.files.length <= 4)
            setImgFiles(event.target.files);
        else
            setUploadMessage("Four images max. Please re-upload the images that you would like.");
    }

    function add_item_to_db() {
        setUploadMessage("Uploading");

        if (title.length == 0 || description.length == 0 || quantity.length == 0 || price.length == 0) { 
            setUploadMessage("Sorry, all fields must be filled out."); 
            return; 
        }

        if (imgFiles.length == 0) { 
            setUploadMessage("Sorry, you must upload at least one image."); 
            return; 
        }

        let item = {
            "name": title,
            "date_added": Date.now(),
            "price": parseInt(price.substring(0, price.indexOf(".")) + "" + price.substring(price.indexOf(".") + 1)), 
            "images": [],
            "description": description,
            "quantity": parseInt(quantity),
        }

        let promises = [];

        // Handle images one by one
        for (let i = 0; i < imgFiles.length; i++) {
        let contentType = imgFiles[i].type;
        let options = {
            params: {
                Key: item.name.replace(/[^a-zA-Z0-9]/g, "") + "_" + i,
                    ContentType: contentType
                },
                headers: {
                    'Content-Type': contentType
                }
        };
        // Upload the image
        promises.push(
            axios.get('http://localhost:5000/items/generate-put-url', options)
            .then(res => {
                const {
                data: { putURL }
                } = res;
                promises.push(
                axios.put(putURL, imgFiles[i], options)
                    .then(res => {
                    setUploadMessage("Upload successful");
                    })
                    .catch(err => {
                    setUploadMessage("Sorry something went wrong");
                    console.log('err', err);
                    })
                )
            })
        )

        // Add the image's url
        item.images.push(("https://handstogetherimages.s3-us-west-1.amazonaws.com/" + options.params.Key))
        }
        // Add item to database after urls are finished generating
        Promise.all(promises)
        .then(() => {
            axios.post('http://localhost:5000/items/add_item', item)
            .then(res => {
                console.log(item);
            })
        })
    }

    function renderImage(imgFiles, pos) { 
        try { 
            return URL.createObjectURL(imgFiles[pos]); 
        }
        catch { 
            return null; 
        }
    }

    return ( 
        // I use bootstrap rows to fluidly force content onto new lines throughout 
        <div className="container-fluid p-0"> 
            <div className="row no-gutters"> 
                <h1 className="title-text">Create new listing</h1> 

                {/* "Photos" box */}
                <div className="listing-box"> 
                    <h2>Photos</h2> 
                    <p>Add up to four photos of your product so buyers can see all the details. Note that you must upload all of them at once.</p>
                     {/* This is a great example of when NOT to use columns in bootstrap. We can simply get all of our elements 
                         to show up in a line together evenly spaced apart by using justify-content in our CSS file after putting 
                         them in a row together  */}
                    <div className="row no-gutters photo-container"> 
                        <div className="add-a-photo d-flex align-items-center justify-content-center" align="center">
                            <input
                                id='upload-image'
                                type='file'
                                accept='image/*'
                                onChange={handleImgUpload}
                                multiple
                            />
                        </div> 
                        <img className="photo-preview" src={renderImage(imgFiles, 0)}/> 
                        <img className="photo-preview" src={renderImage(imgFiles, 1)}/> 
                        <img className="photo-preview" src={renderImage(imgFiles, 2)}/> 
                        <img className="photo-preview" src={renderImage(imgFiles, 3)}/> 
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
                            <input type="text" placeholder="12.99" value={price} onChange={onPriceChange} />
                            <p>Formatting: 12.99 </p> 
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
                    <div className="col-12">
                        <button className="submit-button hands-together-button" onClick={add_item_to_db}>Create</button>
                        <p>{uploadMessage}</p>
                    </div> 
                </div>
            </div>
        </div>
    );
} 

export default AddItemFrontend;