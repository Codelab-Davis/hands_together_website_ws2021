import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require('axios');

function Add_Event() {
  const [uploadMesssage, setUploadMessage] = useState("Upload product images");
  const [imgFile, setImgFile] = useState();

  function handleImgUpload(e) {
    if (e.target.files.length == 1)
      setImgFile(e.target.files);
    else
      setUploadMessage("One image only");
  }

  function add_event_to_db(e) {
    e.preventDefault();
    setUploadMessage("Uploading");
    let event = {
      "name": "My Event " + Math.floor((Math.random() * 500) + 1),
      "date": new Date(),
      "location": "Shields Library",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "attendee_amount": 30,
      "volunteer_amount": 15,
      "image": "",
    }

    let promises = [];

    let contentType = imgFile[0].type;
    let options = {
      params: {
        Key: event.name.replace(/[^a-zA-Z0-9]/g, ""),
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    };
    // Upload the image
    promises.push(
      axios.get('http://localhost:5000/event/generate-put-url', options)
        .then(res => {
          const {
            data: { putURL }
          } = res;
          promises.push(
            axios.put(putURL, imgFile[0], options)
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
    event.image = "https://handstogetherimages.s3-us-west-1.amazonaws.com/" + options.params.Key
    // Add item to database after urls are finished generating
    Promise.all(promises)
      .then(() => {
        axios.post('http://localhost:5000/event/add', event)
          .then(res => {
            console.log(event);
          })
      })
  }

  return (
    <div>
      <form onSubmit={add_event_to_db}>
        <input
          id='upload-image'
          type='file'
          accept='image/*'
          onChange={handleImgUpload}
          multiple
        />
        <p>{uploadMesssage}</p>        
        <button type="submit">Click me to add an event and the uploaded image to the database</button>
      </form>
    </div>
  );
}

export default Add_Event;
