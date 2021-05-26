import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/add_event.css"; 
import EventTile1 from "../../images/EventTile1.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const axios = require('axios');

function AddEvent() {   

    // States to track what is in the input fields 
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [location, setlocation] = useState(''); 

    function logout() {
        axios.delete('http://localhost:5000/jwt/deleteRefreshToken', { withCredentials: true })
         .then(() => window.location.assign('http://localhost:3000'))
        
    }

    // Functions to track typing changes in the input fields 
    function onTitleChange(event) { 
        if (event.target.value.length < 25) 
            setTitle(event.target.value); 
    } 

    function onDescriptionChange(event) { 
        if (event.target.value.length < 75) 
            setDescription(event.target.value); 
    } 

    function onlocationChange(event) { 
        if (event.target.value.length < 35) 
            setlocation(event.target.value); 
    } 

    const [curDate, setCurDate] = useState(new Date()); 
    
    function handleDateChange(date) { 
        // console.log(date); 
        setCurDate(date); 
    }

    function handleImgUpload(event) {
        if (event.target.files.length <= 1)
          setImgFile(event.target.files);
        else
          setUploadMessage("Max One Image Allowed");
    }

    const [uploadMesssage, setUploadMessage] = useState("");
    const [imgFile, setImgFile] = useState();
    const [uploadedImage, setUploadedImage] = useState(false); 

    function handleImgUpload(e) {
        if (e.target.files.length == 1) { 
            setUploadedImage(true); 
            setImgFile(e.target.files);
        }
        else
            setUploadMessage("One image only");
    }

    useEffect(() => { 
        // console.log(imgFile); 
    }, [imgFile])

    function add_event_to_db() { 
        setUploadMessage("Uploading");
        if (title.length == 0 || description.length == 0 || location.length == 0) { 
            setUploadMessage("Sorry, all fields must be filled out."); 
            return; 
        }

        let event = {
            "name": title,
            "date": curDate,
            "location": location,
            "description": description,
            "attendee_amount": 0,
            "volunteer_amount": 0,
        }

        let promises = [];
        
        if (uploadedImage) { 
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
                            .then(res => {})
                            .catch(err => {
                                setUploadMessage("Sorry something went wrong uploading your image.");
                                console.log('err', err);
                            })
                        )
                    })
            )
            // Add the image's url
            event.image = "https://handstogetherlive.s3-us-west-1.amazonaws.com/" + options.params.Key
        }
        // Add item to database after urls are finished generating
        Promise.all(promises)
            .then(() => {
                axios.post('http://localhost:5000/event/add', event, { withCredentials: true })
                .then(res => {
                    // console.log(event);
                    setUploadMessage("Upload successful");
                })
            })
    }

    function renderImage(imgFile) { 
        try { 
            return URL.createObjectURL(imgFile[0]); 
        }
        catch { 
            return null; 
        }
    }

    function determineImage() { 
        if (renderImage(imgFile) != undefined) { 
            return `url(${renderImage(imgFile)})`; 
        }
        else { 
            // console.log("in else statement"); 
            return `url(${EventTile1})`; 
        }
    } 

    return ( 
        // I use bootstrap rows to fluidly force content onto new lines throughout 
        <div className="container-fluid p-0"> 
            <div className="row no-gutters"> 
                <div className='col-8'>
                    <h1 className="title-text">Add Event</h1>
                </div>
                <div className="col-4" align="right">
                    <button className="submit-button" onClick={logout}>Log Out</button>
                </div>

                <div className="listing-box"> 
                    <h2>Event Details</h2> 
                    <li>Adding a photo is optional for events. If you don't, the default image shown will be displayed.</li>
                    <li><strong>It's highly recommended your photo is already cropped to an aspect ratio near 1.5:1. Otherwise, it will be automatically cropped as shown in the preview below.</strong></li>
                    <input
                        id='upload-image'
                        type='file'
                        accept='image/*'
                        onChange={handleImgUpload}
                        style={{marginTop: "1rem"}} 
                    />
                    <p style={{marginTop: "1rem"}}>Edit event name, description, date, and location.</p> 
                    <div className="row no-gutters">
                        <div className="col-6">
                            <div className="col-10 listing-input">
                                <input type="text" placeholder="Event Title" value={title} onChange={onTitleChange} /> 
                                <p>Max 25 characters</p> 
                            </div>
                            <div className="col-10 listing-input">
                                <input type="text" placeholder="Event Description" value={description} onChange={onDescriptionChange} /> 
                                <p>Max 75 characters</p> 
                            </div>
                            <div className="col-10 listing-input">
                                <DatePicker
                                    selected={curDate}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    dateFormat="Pp"
                                />
                                <p>Date and Time</p>
                            </div>
                            <div className="col-10 listing-input">
                                <input type="text" placeholder="Event Location" value={location} onChange={onlocationChange} /> 
                                <p>Max 35 characters</p> 
                            </div>
                        </div>
                        <div className="col-6">
                            <h2 style={{marginTop: "1rem", marginBottom: "1rem"}}>Event Preview</h2>
                            <div class="event-tile-container col-12 col-md-8">
                                <div>
                                    <div className="event-image" style={{backgroundImage: determineImage()}} />
                                </div>
                                    <div className="event_tile_banner" align="left">
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                    <p><strong>Location:</strong> {location}</p>
                                    <p><strong>Time & Date:</strong> {new Date(curDate).toLocaleString('en-US')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="submit-button submit-event hands-together-button" onClick={add_event_to_db}>Create</button>
                            <p>{uploadMesssage}</p>
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