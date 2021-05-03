// Step 1: Initialize the data seeders: 
// const eventSeeder = require("./seed/eventSeeder");
// eventSeeder();

// Step 2: Create dummy data 
// This is just an array of objects, declared as const data = [ {..}, {..} ] 

// Step 3: Create the actual seeder file. This is an example file. 
// const data = require("./event_seeder_data.js");
const Event = require("../models/event.model.js");

const data = [
  {
    name: "Event 1",
    date: new Date(),
    location: "UC Davis",
    description: "My event description",
    attendee_amount: 10,
    volunteer_amount: 5,
  },
  {
    name: "Event 2",
    date: new Date(),
    location: "Kemper Hall",
    description: "My event description",
    attendee_amount: 10,
    volunteer_amount: 5
  },
  {
    name: "Event 3",
    date: new Date(),
    location: "Bainer Hall",
    description: "My event description",
    attendee_amount: 20,
    volunteer_amount: 3,
  },
  {
    name: "Event 4",
    date: new Date(),
    location: "Shields Library",
    description: "My event description",
    attendee_amount: 30,
    volunteer_amount: 15
  }
]

function eventSeeder() {
//   Event.collection.drop();
  for (i = 0; i < data.length; i++) {
    const name = data[i].name;
    const date = Date(data[i].date);
    const location = data[i].location;
    const description = data[i].description;
    const attendee_amount = data[i].attendee_amount;
    const volunteer_amount = data[i].volunteer_amount;
    const newEvent = new Event({
      name,
      date,
      location,
      description,
      attendee_amount,
      volunteer_amount
    });
    newEvent.save();
  }
}

module.exports = eventSeeder;