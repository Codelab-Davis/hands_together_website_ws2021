const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loginSchema = new Schema(
  {
    user: { type: String, required: true },
    pass: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;