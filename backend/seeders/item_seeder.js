// Step 1: Initialize the data seeders: 
// const eventSeeder = require("./seed/eventSeeder");
// eventSeeder();

// Step 2: Create dummy data 
// This is just an array of objects, declared as const data = [ {..}, {..} ] 

// Step 3: Create the actual seeder file. This is an example file. 
// const data = require("./event_seeder_data.js");
const Item = require("../models/items.model.js");

const data = [
  {
    name: "Item 1",
    date_added: new Date(),
    price: 10,
    images: "Image 1",
    description: "Landyard",
  },
  {
    name: "Item 2",
    date_added: new Date(),
    price: 15,
    images: "Image 2",
    description: "Landyard",
  },
  {
    name: "Item 3",
    date_added: new Date(),
    price: 20,
    images: "Image 3",
    description: "Landyard",
  },
  {
    name: "Item 4",
    date_added: new Date(),
    price: 25,
    images: "Image 4",
    description: "Landyard",
  },
]

function itemSeeder() {
  Item.collection.drop();
  console.log("Item dropped");
  for (i = 0; i < data.length; i++) {
    const name = data[i].name;
    const date_added = Date(data[i].date_added);
    const price = data[i].price;
    const images = data[i].images;
    const description = data[i].description;
    const newItem = new Item({
      name,
      date_added,
      price,
      images,
      description
    });
    newItem.save().then(() => console.log(`Item: ${name}, saved`));
  }
}

module.exports = itemSeeder;