const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resfreshTokenSchema = new Schema(
  {
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const refreshToken = mongoose.model("Refresh Token", resfreshTokenSchema);
module.exports = refreshToken;