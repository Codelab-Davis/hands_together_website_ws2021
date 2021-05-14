const EventAttendee = require("../models/event_attendees.model.js");

const data = [
  {
    eventID: "1234",
    name: "Billy",
    age: "12",
    gender: "male",
    phonenum: "123-456-7980",
    email: "abc@gmail.com",
    address: "My address",
    occupation: "Accountant",
    comments: "My comments",
  },
  {
    eventID: "1234",
    name: "Sally",
    age: "12",
    gender: "female",
    phonenum: "123-456-7980",
    email: "abc@gmail.com",
    address: "My address",
    occupation: "Accountant",
    comments: "My comments",
  }
]

function eventAttendeeSeeder() {
  EventAttendee.collection.drop();
  for (i = 0; i < data.length; i++) {
    const eventID = data[i].eventID;
    const name = data[i].name;
    const age = data[i].age;
    const gender = data[i].gender;
    const phonenum = data[i].phonenum;
    const email = data[i].email;
    const address = data[i].address;
    const occupation = data[i].occupation;
    const comments = data[i].comments;
    const newEventAttendee = new EventAttendee({
      eventID,
      name,
      age,
      gender,
      phonenum,
      email,
      address,
      occupation,
      comments,
    });
    newEventAttendee.save();
  }
}

module.exports = eventAttendeeSeeder;