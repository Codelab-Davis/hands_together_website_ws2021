import React, { useState, useEffect } from 'react';
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
    const [image1, setImage1] = useState(null);  
    const [image2, setImage2] = useState(null);  
    const [image3, setImage3] = useState(null);  
    const [image4, setImage4] = useState(null);  


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
    const [imgLinks, setImgLinks] = useState([]); 

    useEffect(() => { 
        renderImage(0);
        renderImage(1);
        renderImage(2);
        renderImage(3);
        handleImageClick(0); 
    }, [imgFiles]); 

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

    function renderImage(pos) { 
        try { 
            let imgLinksCopy = imgLinks;
            if (imgLinksCopy[pos] == undefined) { 
                imgLinksCopy.push(URL.createObjectURL(imgFiles[pos])); 
                console.log("in if statement"); 
            } else { 
                imgLinksCopy[pos] = URL.createObjectURL(imgFiles[pos]); 
                console.log("in else statement"); 
            }
            console.log("setting imgLinksCopy"); 
            setImgLinks(imgLinksCopy);  
        }
        catch { 
            return null; 
        }
    }

    // LISTING PREVIEW FUNCTIONS AND STATES 
    const [imageLink, setImageLink] = useState("");

    function handleImageClick(index) {
        setImageLink(imgLinks[index]);
        for (let i = 0; i < imgLinks.length; i++) {
          document.getElementById(`image${i}`).classList.remove("selected-image");
        }
        document.getElementById(`image${index}`).classList.add("selected-image");
    }

    return ( 
        // I use bootstrap rows to fluidly force content onto new lines throughout 
        <div className="container-fluid p-0"> 
            <div className="row no-gutters"> 
                <h1 className="title-text">Create new listing</h1> 
                
                {/* "Create Listing" box */}
                <div className="listing-box"> 
                    <h2>Create Listing</h2>
                    <li>Add up to four photos of your product so buyers can see all the details. Note that you must upload all of them at once.</li>
                    <li><strong>It's highly recommended your photo is already cropped to a square aspect ratio. Otherwise, it will be automatically cropped as shown in the preview below.</strong></li>
                    <li><strong>The first photo you upload will be the primary listing photo. This will be the photo displayed on the shop home page. </strong></li>
                    <input
                        id='upload-image'
                        type='file'
                        accept='image/*'
                        onChange={handleImgUpload}
                        multiple
                        style={{marginTop: "1rem"}} 
                    />
                    <p style={{marginTop: "1rem"}}>Edit title for item, price, description, and quantity. <strong>The price must be formatted as xx.xx. If it is not, the item will not be purchaseable.</strong></p>
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

                <div className="listing-box">
                    <h2>Preview Listing</h2>
                    <div className="row no-gutters item-info item-page-padding">
                        <div className="col-sm-6 row no-gutters flex-nowrap">
                            <div className="col-2 side-image-container">
                                <div id={`image${0}`} 
                                onClick={() => handleImageClick(0)} 
                                className="side-image"  
                                style={{backgroundImage: `url(${imgLinks[0]})`}}
                                ></div>
                                <div id={`image${1}`} 
                                onClick={() => handleImageClick(1)} 
                                className="side-image"  
                                style={{backgroundImage: `url(${imgLinks[1]})`}}
                                ></div>
                                <div id={`image${2}`} 
                                onClick={() => handleImageClick(2)} 
                                className="side-image"  
                                style={{backgroundImage: `url(${imgLinks[2]})`}}
                                ></div>
                                <div id={`image${3}`} 
                                onClick={() => handleImageClick(3)} 
                                className="side-image"  
                                style={{backgroundImage: `url(${imgLinks[3]})`}}
                                ></div>
                            </div>

                            <div className="col-10 main-image-container">
                            <div className="main-image" style={{backgroundImage: `url(${imageLink})`}}></div>
                            </div>
                        </div>
                        
                        <div className="col-sm-6 right">
                            <h3>{title}</h3>
                            <h4 className="price">{"$" + price.slice(0, -2) + "." + price.slice(-2)}</h4>
                            <hr/>
                            <h4>Description</h4>
                            <p>{description}</p>
                            <select className="quantity" name="quantity">
                                {(() => {
                                    let selectList = [];
                                    for (let i = 1; i <= parseInt(quantity); i++) {
                                    selectList.push(<option value={i}>{i}</option>)
                                    }
                                    return selectList;
                                }
                                )()}
                            </select>
                            <div className="form">
                            <button className="add-cart-button">Add to Cart</button>
                            <p id="item-added-message" className="hidden">Item(s) added!</p>
                            </div>
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