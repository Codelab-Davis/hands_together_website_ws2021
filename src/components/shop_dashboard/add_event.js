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

export default AddEvent;