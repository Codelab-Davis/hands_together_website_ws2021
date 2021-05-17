const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const announcementsSchema = new Schema(
  {
    text: {type: String, required: true}, 
  },
  {
    timestamps: true,
  }
);

const announcements = mongoose.model("announcements", announcementsSchema);
module.exports = announcements;
