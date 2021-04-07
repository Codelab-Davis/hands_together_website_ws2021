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
      "name": "MyItem2",
      "date_added": "2015/03/25",
      "price": 2000, // $20.00
      "images": []
    }

    let promises = [];

    // Handle images one by one
    for (let i = 0; i < imgFiles.length; i++) {
      let contentType = imgFiles[i].type;
      let options = {
        params: {
          Key: item.name + "_" + i,
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

      // Get the image's url and add it to the list
      promises.push(
        axios.get('http://localhost:5000/items/generate-get-url', options)
          .then(res => {
            item.images.push(res.data);
          })
      )
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
