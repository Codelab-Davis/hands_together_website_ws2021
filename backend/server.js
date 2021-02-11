const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
})

const items_router = require('./routes/items');
const sold_items_router = require('./routes/sold_items');
const login_router = require('./routes/login');

app.use('/items', items_router); 
// app.use('/sold_items', sold_items_router);
// app.use('/login', login_router); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});