const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsSchema = new Schema(
  {
    name: { type: String, required: true },
    date_added: { type: Date, required: true },
    price: { type: String, required: true },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model("Items", itemsSchema);
module.exports = Items;