import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { propTypes } from "react-bootstrap/esm/Image";
const axios = require('axios');
//https://react-bootstrap.github.io/components/modal/#modal-dialog-props
//https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
function Admin_Dashboard(props) {
  const [show, setShow] = useState(false);
  const [trackingLink, updateTrackingLink] = useState('');
  const [input, setInput] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // LOADING ALL ITEMS AND PAGINATION STARTS BELOW 
  const [soldItemArray, update] = useState({data: []});
  
  // log whatever item is clicked 
  function clicked(val) {
    console.log(val.name)
  }

  // initialize an empty array using UseState. Next value assignment, use setCurItems
  const [soldItems, setCurItems] = useState([]);
  // intialize an integer that holds the value of the next index after slicing. 
  const [nextIndex, setNextIndex] = useState(0);
  // triggered on the "next" button click 
  function next() {
    if (soldItemArray.data[nextIndex] != undefined) // there are more items to see 
    {
      //slice the next 12 items in the data array. 
      setCurItems(soldItemArray.data.slice(nextIndex, nextIndex + 12));
      //set the next index to the first in the next set of 12 objects
      setNextIndex(nextIndex + 12);
    }
  }
    // triggered on the "previous" button click 
  function back() {
    if (soldItemArray.data[nextIndex - 13] != undefined) // there are previous items to go back to
    { 
      setCurItems(soldItemArray.data.slice(nextIndex - 24, nextIndex - 12));
      setNextIndex(nextIndex - 12);
    }
  }
  function check()
  {
    setCurItems(soldItemArray.data.slice(0,12));
    setNextIndex(12);
    console.log(soldItems);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/sold_items/get_sold_items', { withCredentials: true })
    .then(res => {
      console.log(res)
      // assign json data to itemArray 
      update({data: res.data})
    })
    .catch ( err => {console.log(err)})
  }, [])

  function handleChange()
  {
    alert('handleChange was executed');
  }
  

  function handleSubmit (evt) { 
    evt.preventDefault();
    //updateTrackingLink(trackingLink);
    updateTrackingLink(input);
    //alert(`tracking link input ${trackingLink}`);
    
  }

  function cancelOrder(e) {
      axios.post('http://localhost:5000/stripe/cancel_order')
       .then(res => console.log(res));
  }

  function logout() {
    console.log(props.loggedIn);
    axios.delete('http://localhost:5000/jwt/deleteRefreshToken', { withCredentials: true })
     .then(() => props.setLoggedIn(false));
  }
  
  return (
    <div>
      <p>HELLOOO </p>
      <button onClick={logout}>Logout</button>

      <button type="button" onClick={check}>Check Contents</button>
      {soldItems.map((itemIter, index) =>
        <div key={index}>
            <button onClick={handleShow}>
              name: {itemIter.name}<br />
              transaction_id: {itemIter.transaction_id}<br />
              tracking link: {itemIter.tracking_link} <br />
              cancelled: {itemIter.cancelled} <br />
            </button>
         
        </div>
      )}
    
      
      <button onClick={handleShow}>
        Launch demo modal
      </button>
      <div>
        <p>
          tracking link: {trackingLink}
        </p>
        </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Body>Tracking Link:</Modal.Body>

        {/* created a form element */}
      <form onSubmit={event => handleSubmit(event)}>
          <div>
        {/* this creates a text box that live updates the value of the tracking # */}
            <input type="text" onChange={e => setInput(e.target.value)} />

            {/* in order to avoid random unsubmitted inputs changing the value (due to the live update), 
            we have an intermediate step inside the handleSubmit function that changes the true trackingNumber 
            variable when the button is clicked */}

        <input type="submit" value ="Submit"/>
        
      </div> <p>after input = {trackingLink}</p>
      </form>
      <form onSubmit={e => cancelOrder(e)}>
            <input type="submit" value="Cancel Order"/>
      </form>
      
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      </div>
      
  );
}

export default Admin_Dashboard;

