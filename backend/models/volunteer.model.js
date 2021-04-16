const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const volunteerSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: false },
    gender: { type: String, required: false },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    questions_concerns: { type: String, required: true },
    event_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
module.exports = Volunteer;