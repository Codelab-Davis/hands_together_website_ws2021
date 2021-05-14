import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require('axios');

function Add_Item() {
  const [uploadMesssage, setUploadMessage] = useState("Upload product images");
  const [imgFiles, setImgFiles] = useState([]);

  function handleImgUpload(event) {
    if (event.target.files.length > 0 && event.target.files.length <= 4)
      setImgFiles(event.target.files);
    else
      setUploadMessage("Four images max");
  }

  function add_item_to_db(event) {
    event.preventDefault();
    setUploadMessage("Uploading");
    let item = {
      "name": "My Item " + Math.floor((Math.random() * 500) + 1),
      "date_added": Date.now(),
      "price": 1000, // $10.00
      "images": [],
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "quantity": 3,
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

  return (
    <div>
      In theory, you would want to make a form here to test that you can actually capture user input. That part, however, is up to you all. :) 

      <form onSubmit={add_item_to_db}>
        <input
          id='upload-image'
          type='file'
          accept='image/*'
          onChange={handleImgUpload}
          multiple
        />
        <p>{uploadMesssage}</p>        
        <button type="submit">Click me to add an item and the uploaded images to the database</button>
      </form>
    </div>
  );
}

export default Add_Item;
