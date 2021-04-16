const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventAttendeesSchema = new Schema(
  {
    eventID: {type: String, required: true},
    name: { type: String, required: true },
    age: {type: String, requried: true},
    //date_added: { type: Date, required: true },   could be included if age = date of birth 
    gender: {type: String, required: true}, // type should probably be another schema for mc options
    //areacode: { type: String, required: true },
    phonenum: { type: String, required:true },
    email: { type: String, required: true },
    //address: { type: Map, required: true},
    address: {type: String, required: true},
    occupation: { type: String, required: true },
    comments: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const EventAttendees = mongoose.model("event_attendees", eventAttendeesSchema);
module.exports = EventAttendees;
