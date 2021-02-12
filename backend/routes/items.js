const router = require('express').Router();
let Item = require('../models/items.model.js') 

router.route('/add_item').post((req, res) => {
    const name = req.body.name;
    const date_added = req.body.date_added;
    const price = req.body.price;
    const images = req.body.images;

    const newItem = new Item({
        name,
        date_added,
        price,
        images,
    });

    newItem.save()
        .then(() => res.json('New Item Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;