const Login = require("../models/login.model.js");

const data = [
  {
    user: "watermelon",
    pass: "green"
  },
  {
    user: "grape",
    pass: "purple"
  },
  {
    user: "lemon",
    pass: "yellow"
  },
]

function loginSeeder() {
  Login.collection.drop();
  for (i = 0; i < data.length; i++) {
    const user = data[i].user;
    const pass = data[i].pass;
    const newLogin = new Login({
      user,
      pass
    });
    newLogin.save();
  }
}

module.exports = loginSeeder;