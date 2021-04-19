const router = require('express').Router();
let Volunteer = require('../models/volunteer.model.js')
const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100
});

limiter.schedule(() => {
  router.route('/get_volunteers').get((req,res) => {
      Volunteer.find()
      .then(volunteers => res.json(volunteers))
      .catch(err => res.status(400).json("Error: " + err));
  });
})

limiter.schedule(() => {
  router.route('/add_volunteer').post((req, res) => {
      const name = req.body.name;
      const age = req.body.age;
      const gender = req.body.gender;
      const phone_number = req.body.phone_number;
      const email = req.body.email;
      const questions_concerns = req.body.questions_concerns;
      const event_id = req.body.event_id;
      const newVolunteer = new Volunteer({
          name,
          age,
          gender,
          phone_number,
          email,
          questions_concerns,
          event_id
      });

      newVolunteer.save()
      .then(() => res.json("New Volunteer Added!"))
      .catch(err => res.status(400).json('Error: ' + err));

  });
})

limiter.schedule(() => {
  router.route('/get_by_event').get((req, res) => {
      const event_id = {"event_id": req.body.event_id};   // JSON in format { transaction_id: "" }

      Volunteer.find(event_id, (err, docs) => {
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