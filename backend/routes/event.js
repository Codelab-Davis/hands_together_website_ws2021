const router = require('express').Router();
let Event = require('../models/event.model.js');
const Bottleneck = require('bottleneck');
const tokenAuth = require('../jwtAuth');

//minTime --> process 1 API request every 100 miliseconds
//maxConcurrent --> limits the number of calls in the queue to a max of 10 
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
  generatePutUrl,
  deleteImage,
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

limiter.schedule(() => {
  router.route('/delete_image').delete((req,res) => {
      const Key = req.body.Key;
      deleteImage(Key)
          .then(() => {
              console.log(Key + " deleted!");
              res.send(Key);
          })
          .catch(err => {
              console.log(err);
              res.send(err);
          })
  });
})

//
// Other Routes
//

limiter.schedule(() => {
  router.post('/add', (req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const location = req.body.location;
    const description = req.body.description;
    const attendee_amount = req.body.attendee_amount;
    const volunteer_amount = req.body.volunteer_amount;
    const image = req.body.image;

    const newEvent = new Event({name, date, location, description, attendee_amount, volunteer_amount, image})

    newEvent.save()
      .then(() => res.json('Event added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
})

limiter.schedule(() => {
  router.route('/get_all_events').get((req, res) => {
    Event.find()
      .then(events => res.json(events))
      .catch(err=>res.status(400).json('Error: ' + err));
  });
})

limiter.schedule(() => {
  router.route('/get_event').get((req, res) => {
    const eventId = req.body.eventId;

    Event.findById(eventId)
      .then(event => res.json(event))
      .catch(err=>res.status(400).json('Error: ' + err));
  });
})

limiter.schedule(() => {
  router.route('/delete_event/:id').delete((req, res) => {
      Event.findByIdAndDelete(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.status(400).json('Error: ' + err));
  });
})

module.exports = router;