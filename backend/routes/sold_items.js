const router = require('express').Router();
const Sold_Item = require('../models/sold_items.model')

router.route('/get_sold_items').get((req,res) => {
    Sold_Item.find()
      .then(Sold_Item => res.json(Sold_Item))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add_item').post((req, res) => {
    const name = req.body.name;
    const date_added = req.body.date_added;
    const price = req.body.price;
    const images = req.body.images;
    const date_sold = "2021/02/16";
    const transaction_id = "abcd1234";

    let newSoldItem = new Sold_Item({
        name,
        date_added,
        price,
        images,
        date_sold,
        transaction_id
    });

    newSoldItem.save()
     .then(() => res.json("New Item Purchased!"))
     .catch(() => res.status(400).json("Error: " + err));
});

module.exports = router; 