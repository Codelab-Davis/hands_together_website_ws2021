import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
const axios = require('axios');

function Admin_Dashboard() {
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
    axios.get('http://localhost:5000/sold_items/get_sold_items')
    .then( res => {
      console.log(res)
      // assign json data to itemArray 
      update({data: res.data})
    })
    .catch ( err => {console.log(err)})
  }, [])


/**
 *  ('#myModal').on('shown.bs.modal', function () {
    ('#myInput').trigger('focus')
  })
 */

 /**
  * $('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})
  */
  return (
    <div>
      <p> HELLOOO </p>
      <button type="button" onClick={check}>Check Contents</button>

      {soldItems.map((itemIter, index) =>
        <div key={index}>
        <a href={`/:${itemIter.transaction_id}`}>
          <button onClick={() => clicked(itemIter)}>
            name: {itemIter.name}<br />
            transaction_id: {itemIter.transaction_id}<br />
            price: {itemIter.price}<br />
            date added: {itemIter.date_added}<br />
            images: [{itemIter.images}]<br />
          </button>
        </a>
        </div>
      )}
      
      
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
      </div>

    </div>
  );
}

export default Admin_Dashboard;
