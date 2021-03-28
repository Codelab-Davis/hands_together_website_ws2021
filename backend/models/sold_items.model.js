const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sold_ItemsSchema = new Schema(
  {
    name: { type: String, required: true },
    date_added: { type: Date, required: true },
    price: { type: String, required: true },
    images: { type: [String], required: true },
    date_sold: { type: Date, required: true },
    transaction_id: { type: String, required: true },
    tracking_link: { type: String, required: true },
    cancelled: { type: Boolean, required: true },
    shipping_address: { type: Map, required: true}
  },
  {
    timestamps: true,
  }
);

const Sold_Items = mongoose.model("Sold_Items", sold_ItemsSchema);
module.exports = Sold_Items;