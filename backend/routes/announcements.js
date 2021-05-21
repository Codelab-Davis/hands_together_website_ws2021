const router = require('express').Router();
const Announcement = require('../models/announcements.model');
const tokenAuth = require('../jwtAuth');

const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100
});

limiter.schedule(() => {
  router.post('/add_announcement', tokenAuth, (req, res) => { 
    const text = req.body.text;

    let new_announcement = new Announcement({
        text
    });
    new_announcement.save()
      .then(() => res.json("New Announcement Added!"))
      .catch(() => res.status(400).json("Error: " + err));
  });
})

limiter.schedule(() => {
  router.route('/get_announcement').get((req, res) => {
    Announcement.find()
      .then(Announcement => res.json(Announcement))
      .catch(err => res.status(400).json('Error: ' + err));
  });
})

limiter.schedule(() => {
    router.route('/delete_announcement/:id').delete((req, res) => {
        Announcement.findByIdAndDelete(req.params.id)
        .then(announcement => res.json(announcement))
        .catch(err => res.status(400).json('Error: ' + err));
    });
})
  
module.exports = router; 