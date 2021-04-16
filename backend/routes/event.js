const router = require('express').Router();
let Event = require('../models/event.model.js');
const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100
});

limiter.schedule(() => {
  router.route('/add').post((req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const location = req.body.location;
    const description = req.body.description;
    const attendee_amount = req.body.attendee_amount;
    const volunteer_amount = req.body.volunteer_amount;

    const newEvent = new Event({name, date, location, description, attendee_amount, volunteer_amount})

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

module.exports = router;