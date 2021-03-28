const router = require('express').Router();
const Sold_Item = require('../models/sold_items.model')
//https://bezkoder.com/react-node-express-mongodb-mern-stack/

router.route('/update_item').put((req, res) => {
    Sold_Item.find()
        .then(Sold_Item => res.json(Sold_Item))
        .catch(err => res.status(400).json('Error: ' + err));
        
});

router.route('/get_sold_items').get((req, res) => {
    Sold_Item.find()
      .then(Sold_Item => res.json(Sold_Item))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_sale').get((req, res) => {
    const transaction_id = JSON.parse(req.query.transaction_id);  // JSON in format { transaction_id: "" }

    Sold_Item.find(transaction_id, (err, docs) => {
      if (err) {
        console.log('Error');
      } else if (!docs) {
        res.json(false);
      } else {
        res.json(docs);
      }
    })
});

router.route('/add_item').post((req, res) => {
    const name = req.body.name;
    const date_added = req.body.date_added;
    const price = req.body.price;
    const images = req.body.images;
    const date_sold = "2021/02/16";
    const transaction_id = req.body.transaction_id;
    const tracking_link = "test_link";
    const cancelled = false;
    const shipping_address = req.body.shipping_address;
    console.log(req.body.shipping_address);

    let newSoldItem = new Sold_Item({
        name,
        date_added,
        price,
        images,
        date_sold,
        transaction_id,
        tracking_link,
        cancelled,
        shipping_address
    });
    newSoldItem.save()
     .then(() => res.json("New Item Purchased!"))
     .catch(() => res.status(400).json("Error: " + err));
});

module.exports = router; 