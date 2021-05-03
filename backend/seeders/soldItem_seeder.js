// Step 1: Initialize the data seeders: 
// const eventSeeder = require("./seed/eventSeeder");
// eventSeeder();

// Step 2: Create dummy data 
// This is just an array of objects, declared as const data = [ {..}, {..} ] 

// Step 3: Create the actual seeder file. This is an example file. 
// const data = require("./event_seeder_data.js");
const soldItem = require("../models/sold_items.model.js");

const data = [
  {
    name: "Sold Item 1",
    date_added: new Date(),
    price: 10,
    images: "Image 1",
    date_sold: new Date(),
    transaction_id: "Transaction 1",
    tracking_link: "Tracking Link 1", 
    cancelled: false,
    shipping_address: {"myMap": "test"}
  },
  {
    name: "Sold Item 2",
    date_added: new Date(),
    price: 10,
    images: "Image 2",
    date_sold: new Date(),
    transaction_id: "Transaction 2",
    tracking_link: "Tracking Link 2", 
    cancelled: false,
    shipping_address: {"myMap": "test"}
  },
  {
    name: "Sold Item 3",
    date_added: new Date(),
    price: 10,
    images: "Image 3",
    date_sold: new Date(),
    transaction_id: "Transaction 3",
    tracking_link: "Tracking Link 3", 
    cancelled: false,
    shipping_address: {"myMap": "test"}
  },
  {
    name: "Sold Item 4",
    date_added: new Date(),
    price: 10,
    images: "Image 4",
    date_sold: new Date(),
    transaction_id: "Transaction 4",
    tracking_link: "Tracking Link 4", 
    cancelled: false,
    shipping_address: {"myMap": "test"}
  },
]

function soldItemSeeder() {
  soldItem.collection.drop();
  for (i = 0; i < data.length; i++) {
    const name = data[i].name;
    const date_added = Date(data[i].date_added);
    const price = data[i].price;
    const images = data[i].images;
    const date_sold = data[i].date_sold;
    const transaction_id = data[i].transaction_id;
    const tracking_link = data[i].tracking_link;
    const cancelled = data[i].cancelled;
    const shipping_address = data[i].shipping_address;
    const newSoldItem = new soldItem({
      name,
      date_added,
      price,
      images,
      date_sold,
      transaction_id,
      tracking_link,
      cancelled,
      shipping_address
    });
    newSoldItem.save();
  }
}

module.exports = soldItemSeeder;