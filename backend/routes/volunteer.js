const router = require('express').Router();
let Volunteer = require('../models/volunteer.model.js')
const Bottleneck = require('bottleneck');
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // dummy email credentials
    pass: process.env.PASS
  }
});

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
      console.log(req.body);
      const name = req.body.name;
      const age = req.body.age;
      const phone_number = req.body.phone_number;
      const email = req.body.email;
      const questions_concerns = req.body.questions_concerns;
      const newVolunteer = new Volunteer({
          name,
          age,
          phone_number,
          email,
          questions_concerns,
      });

      newVolunteer.save()
      .then(() => { 
        const mail_options = {
          from: `"Hands Together" <ellen@handstogether-sa.org>`,
          to: `ellen@handstogether-sa.org`,
          subject: "New Volunteer Sign-Up",
          html: `
          <h1>A new volunteer has just signed up for Hands Together. You can view them in dashboard as well as pasted below. </h1>
          <li>Name: ${name}</li>
          <li>Age: ${age}</li>
          <li>Phone Number: ${phone_number}</li>
          <li>Email: ${email}</li>
          <li>Questions/Concerns: ${questions_concerns}</li>`
        }
      
        transporter.sendMail(mail_options, function(error, info) {
          if(error) {
            console.log(error);
          } else {
            console.log('Volunteer Sign-up Email Sent: ' + info.response);
          }
        });
        res.json("New Volunteer Added!")
      })
      .catch(err => res.status(400).json('Error: ' + err));

  });
})

limiter.schedule(() => {
  router.route('/get_by_event').get((req, res) => {
      const event_id = {"event_id": req.query.event_id};   // JSON in format { transaction_id: "" }

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