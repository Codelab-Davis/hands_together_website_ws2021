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
    image: "123",
  },
  {
    name: "Event 2",
    //cannot edit date directly, must use getDate to get a date object to decrement,  (otherwise subtracts 1 milisecond from date), fun syntax stuff. Also, the default value of new Date() is today's date. 
    date: new Date().setDate(new Date().getDate() - 1),
    location: "Kemper Hall",
    description: "My event description",
    attendee_amount: 10,
    volunteer_amount: 5,
    image: "123",
  },
  {
    name: "Event 3",
    date: new Date().setDate(new Date().getDate() - 2),
    location: "Bainer Hall",
    description: "My event description",
    attendee_amount: 20,
    volunteer_amount: 3,
    image: "123",
  },
  {
    name: "Event 4",
    date: new Date().setDate(new Date().getDate() - 3),
    location: "Shields Library",
    description: "My event description",
    attendee_amount: 30,
    volunteer_amount: 15
  },
  {
    name: "Event 5",
    date: new Date().setDate(new Date().getDate() + 1),
    location: "Shields Library",
    description: "My event description",
    attendee_amount: 30,
    volunteer_amount: 15
  },
  {
    name: "Event 6",
    date: new Date().setDate(new Date().getDate() + 2),
    location: "Shields Library",
    description: "My event description",
    attendee_amount: 30,
    volunteer_amount: 15
  },
  {
    name: "Event 7",
    date: new Date().setDate(new Date().getDate() + 3),
    location: "Shields Library",
    description: "My event description",
    attendee_amount: 30,
    volunteer_amount: 15
  },
  {
    name: "Event 8",
    date: new Date().setDate(new Date().getDate() + 4),
    location: "Shields Library",
    description: "My event description",
    attendee_amount: 30,
    volunteer_amount: 15
  },
  {
    name: "Event 9",
    date: new Date().setDate(new Date().getDate() + 5),
    location: "Shields Library",
    description: "My event description",
    attendee_amount: 30,
    volunteer_amount: 15
  },
  {
    name: "Event 10",
    date: new Date().setDate(new Date().getDate() + 6),
    location: "Shields Library",
    description: "My event description",
    attendee_amount: 30,
    volunteer_amount: 15
  },
]

function eventSeeder() {
  Event.collection.drop();
  for (i = 0; i < data.length; i++) {
    const name = data[i].name;
    const date = new Date(data[i].date);
    const location = data[i].location;
    const description = data[i].description;
    const attendee_amount = data[i].attendee_amount;
    const volunteer_amount = data[i].volunteer_amount;
    const image = data[i].image;
    const newEvent = new Event({
      name,
      date,
      location,
      description,
      attendee_amount,
      volunteer_amount,
      image,
    });
    newEvent.save();
  }
}

module.exports = eventSeeder;