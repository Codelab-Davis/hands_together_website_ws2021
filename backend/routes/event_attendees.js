const router = require('express').Router();
const EventAttendee = require('../models/event_attendees.model')

const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100
});

limiter.schedule(() => {
  router.route('/add_attendee').post((req, res) => { // change route as necessary
    const eventID = req.body.eventID; 
    const name = req.body.name;
    const age = req.body.age;
    //const areacode = req.body.areacode;
    const gender = req.body.gender; 
    const phonenum = req.body.phonenum; 
    const email = req.body.email;
    const address = req.body.address;
    const occupation = req.body.ocupation; 
    const comments = req.body.comments; 
    //console.log(req.body.address);

    let attendee = new EventAttendee({
        eventID,   
        name,
        age,
        //areacode,
        gender,
        phonenum,
        email,
        address,
        occupation,
        comments
    });
    attendee.save()
      .then(() => res.json("New Atendee Added!"))
      .catch(() => res.status(400).json("Error: " + err));
  });
})

limiter.schedule(() => {
  router.route('/get_all_attendees').get((req, res) => {
    EventAttendee.find()
      .then(EventAttendee => res.json(EventAttendee))
      .catch(err => res.status(400).json('Error: ' + err));
  });
})

limiter.schedule(() => {
  router.route('/get_attendee').get((req, res) => {
    const eventID = JSON.parse(req.query.eventID);  // JSON in format { transaction_id: "" }

    EventAttendee.find(eventID, (err, docs) => {
      if (err) {
        console.log('Error');
      } else if (!docs) {
        res.json(false);
      } else {
        res.json(docs);
      }
    })
  });
})
  
  module.exports = router; 