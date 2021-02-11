import "bootstrap/dist/css/bootstrap.min.css";
const axios = require('axios');

function Add_Item() {

  function add_item_to_db() {
    let item = 
    {
      "name": "Item #2",
      "date_added": "2015/03/25",
      "price": "$45.13",
      "images": ["imagelink#1", "imagelink#2"]
    }

    axios.post('http://localhost:5000/items/add_item', item)
      .then(res => console.log(res.data))
  }

  return (

    <div>
      In theory, you would want to make a form here to test that you can actually capture user input. That part, however, is up to you all. :) 

     <button onClick={add_item_to_db}>Click me to add a random item to the database!</button>
    </div>
  );
}

export default Add_Item;
