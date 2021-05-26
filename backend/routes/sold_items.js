const tokenAuth = require('../jwtAuth');
const router = require('express').Router();
const Sold_Item = require('../models/sold_items.model')
//https://bezkoder.com/react-node-express-mongodb-mern-stack/
const Bottleneck = require('bottleneck');
const { default: axios } = require('axios');

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100
});

limiter.schedule(() => {
  router.put('/mark_cancelled', (req,res) => { 
      Sold_Item.findByIdAndUpdate({_id: req.body._id}, req.body)
          .then(Sold_Item => res.json(Sold_Item)) 
          .catch(err => res.status(400).json('Error: ' + err));         
  });
})

limiter.schedule(() => {
  router.put('/update_tracking_link', async (req,res) => { 
      Sold_Item.findByIdAndUpdate({_id: req.body._id}, req.body)
          .then(Sold_Item => {
            axios.post('http://localhost:5000/stripe/update_tracking', { transaction_id: Sold_Item.transaction_id, tracking_link: req.body.tracking_link }, { withCredentials: true })
            res.json(Sold_Item)
          }) 
          .catch(err => res.status(400).json('Error: ' + err));         
  });
})

limiter.schedule(() => {
  router.get('/get_sold_items', (req, res) => {
    Sold_Item.find()
      .then(Sold_Item => res.json(Sold_Item))
      .catch(err => res.status(400).json('Error: ' + err));
  });
})

limiter.schedule(() => {
  router.get('/get_sale/:id', (req,res) => {
    const transaction_id = req.params.id;  // JSON in format { transaction_id: "" }
    console.log(transaction_id); 
    Sold_Item.findById(req.params.id)
      .then(item=>res.json(item))
      .catch(err=>res.status(400).json('Error: ' + err));
  });
})


limiter.schedule(() => {
  router.post('/add_item', (req,res) => {
    const name = req.body.name;
    const date_added = req.body.date_added;
    const price = req.body.price;
    const images = req.body.images;
    const date_sold = new Date();
    const transaction_id = req.body.transaction_id;
    const tracking_link = "test_link";
    const cancelled = false;
    const shipping_address = req.body.shipping_address; 
    const quantity = req.body.quantity;

    console.log(req.body)

    let newSoldItem = new Sold_Item({
        name,
        date_added,
        price,
        images,
        date_sold,
        transaction_id,
        tracking_link,
        cancelled,
        shipping_address,
        quantity,
    });

    newSoldItem.save()
     .then(() => res.json("New Item Purchased!"))
     .catch(err => res.status(400).json("Error: " + err));
  });
})


module.exports = router; 