const Volunteer = require("../models/volunteer.model.js");

const data = [
  {
    name: "Bill",
    age: "20",
    gender: "male",
    phone_number: "123-456-7890",
    email: "volunteer@email.com",
    questions_concerns: "none",
    event_id: "123",
  },
  {
    name: "Sally",
    age: "18",
    gender: "female",
    phone_number: "123-456-7890",
    email: "volunteer@email.com",
    questions_concerns: "none",
    event_id: "456",
  },
  {
    name: "Jessie",
    age: "40",
    gender: "female",
    phone_number: "123-456-7890",
    email: "volunteer@email.com",
    questions_concerns: "none",
    event_id: "789",
  },
]

function volunteerSeeder() {
  Volunteer.collection.drop();
  console.log("Volunteer dropped");
  for (i = 0; i < data.length; i++) {
    const name = data[i].name;
    const age = data[i].age;
    const gender = data[i].gender;
    const phone_number = data[i].phone_number;
    const email = data[i].email;
    const questions_concerns = data[i].questions_concerns;
    const event_id = data[i].event_id;
    const newVolunteer = new Volunteer({
      name,
      age,
      gender,
      phone_number,
      email,
      questions_concerns,
      event_id,
    });
    newVolunteer.save().then(() => console.log(`Volunteer: ${name}, saved`));
  }
}

module.exports = volunteerSeeder;