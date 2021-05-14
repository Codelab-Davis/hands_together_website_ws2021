import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/add_event.css"; 

function AddEvent() { 

    // States to track what is in the input fields 
    const [title, setTitle] = useState(''); 
    const [date, setdate] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [location, setlocation] = useState(''); 

    // Functions to track typing changes in the input fields 
    function onTitleChange(event) { 
        setTitle(event.target.value); 
    } 

    function ondateChange(event) { 
        setdate(event.target.value); 
    } 

    function onDescriptionChange(event) { 
        setDescription(event.target.value); 
    } 

    function onlocationChange(event) { 
        setlocation(event.target.value); 
    } 

    return ( 
        // I use bootstrap rows to fluidly force content onto new lines throughout 
        <div className="container-fluid p-0"> 
            <div className="row no-gutters"> 
                <h1 className="title-text">Add Event</h1> 
                
                <div className="listing-box"> 
                    <h2>Event Details</h2> 
                    <div className="row no-gutters listing-input"> 
                        <div className="col-10 col-md-6">
                            <input type="text" placeholder="Event Title" value={title} onChange={onTitleChange} /> 
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-10 col-md-6">
                            <input type="text" placeholder="Event Description" value={description} onChange={onDescriptionChange} /> 
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-10 col-md-6">
                            <input type="text" placeholder="Event Date" value={description} onChange={onDescriptionChange} /> 
                        </div>
                    </div>
                    <div className="row no-gutters listing-input"> 
                        <div className="col-10 col-md-6">
                            <input type="text" placeholder="Event Location" value={location} onChange={onlocationChange} /> 
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
} 

// const axios = require('axios');

// function Add_Event() {
//   const [uploadMesssage, setUploadMessage] = useState("Upload product images");
//   const [imgFile, setImgFile] = useState();

//   function handleImgUpload(e) {
//     if (e.target.files.length == 1)
//       setImgFile(e.target.files);
//     else
//       setUploadMessage("One image only");
//   }

//   function add_event_to_db(e) {
//     e.preventDefault();
//     setUploadMessage("Uploading");
//     let event = {
//       "name": "My Event " + Math.floor((Math.random() * 500) + 1),
//       "date": new Date(),
//       "location": "Shields Library",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       "attendee_amount": 30,
//       "volunteer_amount": 15,
//       "image": "",
//     }

//     let promises = [];

//     let contentType = imgFile[0].type;
//     let options = {
//       params: {
//         Key: event.name.replace(/[^a-zA-Z0-9]/g, ""),
//         ContentType: contentType
//       },
//       headers: {
//         'Content-Type': contentType
//       }
//     };
//     // Upload the image
//     promises.push(
//       axios.get('http://localhost:5000/event/generate-put-url', options)
//         .then(res => {
//           const {
//             data: { putURL }
//           } = res;
//           promises.push(
//             axios.put(putURL, imgFile[0], options)
//               .then(res => {
//                 setUploadMessage("Upload successful");
//               })
//               .catch(err => {
//                 setUploadMessage("Sorry something went wrong");
//                 console.log('err', err);
//               })
//           )
//         })
//     )

//     // Add the image's url
//     event.image = "https://handstogetherimages.s3-us-west-1.amazonaws.com/" + options.params.Key
//     // Add item to database after urls are finished generating
//     Promise.all(promises)
//       .then(() => {
//         axios.post('http://localhost:5000/event/add', event)
//           .then(res => {
//             console.log(event);
//           })
//       })
//   }

//   return (
//     <div>
//       <form onSubmit={add_event_to_db}>
//         <input
//           id='upload-image'
//           type='file'
//           accept='image/*'
//           onChange={handleImgUpload}
//           multiple
//         />
//         <p>{uploadMesssage}</p>        
//         <button type="submit">Click me to add an event and the uploaded image to the database</button>
//       </form>
//     </div>
//   );

export default AddEvent;