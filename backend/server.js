const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieparser());
app.use(express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
  }))

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, sorry!"
});

app.use(limiter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
})

const items_router = require('./routes/items');
const sold_items_router = require('./routes/sold_items');
const login_router = require('./routes/login');
const volunteer_router = require('./routes/volunteer');
const event_router = require('./routes/event');
const event_attendees_router = require('./routes/event_attendees');
const stripe_router = require('./routes/stripe_routes');
const jwt_router = require('./routes/jwt_routes');

app.use('/items', items_router); 
app.use('/sold_items', sold_items_router);
app.use('/login', login_router); 
app.use('/volunteer', volunteer_router);
app.use('/event', event_router);
app.use('/event_attendees', event_attendees_router);
app.use('/stripe', stripe_router);
app.use('/jwt', jwt_router);

const eventSeeder = require("./seeders/event_seeder");
const itemSeeder = require("./seeders/item_seeder");
const soldItemSeeder = require("./seeders/soldItem_seeder");
const loginSeeder = require("./seeders/login_seeder");
const volunteerSeeder = require("./seeders/volunteer_seeder");
const eventAttendeeSeeder = require("./seeders/event_attendee_seeder");
eventAttendeeSeeder();
eventSeeder();
// itemSeeder(); This should stay commented out so the items with images aren't overwritten
soldItemSeeder();
loginSeeder();
volunteerSeeder();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});