const router = require('express').Router();
let Item = require('../models/items.model.js');
const Bottleneck = require('bottleneck'); 

const limiter = new Bottleneck({
    maxConcurrent: 10,
    minTime: 100
});

//
// AWS Routes
//

// Importing AWSPresigner
const {
    generateGetUrl,
    generatePutUrl
} = require('./../AWSPresigner');

// GET URL
limiter.schedule(() => {
    router.route('/generate-get-url').get((req, res) => {
        // Both Key and ContentType are defined in the client side.
        // Key refers to the remote name of the file.
        const { Key } = req.query;
        generateGetUrl(Key)
            .then(getURL => {      
            res.send(getURL);
            })
            .catch(err => {
            res.send(err);
            });
        });
})


// PUT URL
limiter.schedule(() => {
    router.route('/generate-put-url').get((req,res)=>{
        // Both Key and ContentType are defined in the client side.
        // Key refers to the remote name of the file.
        // ContentType refers to the MIME content type, in this case image/jpeg
        const { Key, ContentType } =  req.query;
        generatePutUrl(Key, ContentType)
            .then(putURL => {
            res.send({putURL});
            })
            .catch(err => {
            res.send(err);
            });
        });
})

//
// Other Routes
//
limiter.schedule(() => {
    router.route('/get_all_items').get((req,res)=>{
        Item.find()
        .then(items=>res.json(items))
        .catch(err=>res.status(400).json('Error: '+err));
    });
})


limiter.schedule(() => {
    router.route('/get_item/:id').get((req,res)=>{
        Item.findById(req.params.id)
        .then(item=>res.json(item))
        .catch(err=>res.status(400).json('Error: ' + err));
    });
})


limiter.schedule(() => {
    router.route('/add_item').post((req, res) => {
        const name = req.body.name;
        const date_added = req.body.date_added;
        const price = req.body.price;
        const images = req.body.images;
        const description = req.body.description;

        const newItem = new Item({
            name,
            date_added,
            price,
            images,
            description,
        });

        newItem.save()
            .then(() => res.json('New Item Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    });
})



// This is a duplicate of the purchase_item route
limiter.schedule(() => {
    router.route('/delete_item/:id').delete((req, res) => {
        Item.findByIdAndDelete(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
    });
})


limiter.schedule(() => {
    router.route('/purchase_item/:id').delete((req, res) => {
        Item.findByIdAndDelete(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
    });
})


module.exports = router;