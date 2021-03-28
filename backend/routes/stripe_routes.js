const { response } = require('express');
var express = require('express');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const nodemailer = require("nodemailer");

var router = express.Router();
require('dotenv').config();

router.route('/create-checkout-session').post(async (req, res) => {
  let transaction_id = "abcd1234"
  let success = "http://localhost:3000/order_summary/" + transaction_id
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ['US'],
        },
        payment_method_types: ['card'], // list of payment methods
        line_items: [ 
          {
            price_data: { // product info
              currency: 'usd',
              product_data: {
                name: 'Stubborn Attachments',
                images: ['https://i.imgur.com/EHyR2nP.png'],
              },
              unit_amount: 2000,
            },
            quantity: 1,
            tax_rates: ['txr_1IRmOEDACjkjrvMmvkTvvmYZ']
          },
        ],
        metadata: {'id': req.body.item_id, 'transaction_id': transaction_id},
        mode: 'payment',
        success_url: `${success}`, // html pages to show for successful/cancelled transactions
        cancel_url: "http://localhost:3000/",
      });

      res.json({ id: session.id });
});

// Donation form.
router.get('/', function(req, res) {
  res.render('donate');
});

router.post('/', async (req, res, next) => {
  // TO ADD: data validation, storing errors in an `errors` variable!
  const name = req.body.name;
  const email = req.body.email;
  const amount = req.body.amount;
  if (true) { // Data is valid!
    try {
      // Create a PI:
      const stripe = require('stripe')('sk_test_51IMhDjDACjkjrvMmiJxcdbJqejCQ3W9dwagP8gDp7l5wHk0Qm7oWgkmOKVqxVMOutTF7nKoPI86eX84PY6ZZqQj100pJsabLN1');
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // In cents
        currency: 'usd',
        receipt_email: email,
      });
      res.render('card', {name: name, amount: amount, intentSecret: paymentIntent.client_secret });
    } catch(err) {
      console.log('Error! ', err.message);
    }
  } else {
    res.render('donate', { title: 'Donate', errors: errors });
  }
});

// Thanks page.
router.post('/thanks', function(req, res) {
  res.render('thanks', { title: 'Thanks!' });
});

router.route('/donate').post(async (req,res) => {
  try {
    const stripe = require('stripe')('sk_test_51IMhDjDACjkjrvMmiJxcdbJqejCQ3W9dwagP8gDp7l5wHk0Qm7oWgkmOKVqxVMOutTF7nKoPI86eX84PY6ZZqQj100pJsabLN1');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1477, // $14.77, an easily identifiable amount
      currency: 'usd',
    });
    console.log('Worked! ', paymentIntent.id);
  } catch(err) {
    console.log('Error! ', err.message);
  }
});

// Successful Checkout Event Handler

// transporter for node mailer
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dummyemailclht', // dummy email credentials
    pass: 'dummypass'
  }
});

const fulfillOrder = (session) => {
  let id = session.metadata['id']; // object id for mongo access
  let customer_email = session.customer_details['email']; 
  let order_summary_url = "http://localhost:3000/order_summary/" + session.metadata['transaction_id']; 

  let email_body = "<h1>Test Email</h1> <br /> <p>" + order_summary_url + "</p>"; 

  // update datebase on successful purchase (delete from items and add to sold_items)
  axios.delete('http://localhost:5000/items/purchase_item/' + id)
    .then(item => {
     console.log("Deleted Item")
     console.log(item.data)
     item.data['shipping_address'] = session.shipping.address;
     item.data['transaction_id'] = session.metadata['transaction_id'];
     axios.post('http://localhost:5000/sold_items/add_item', item.data)
      .then(res => console.log(res.data))
    })
    .catch(error => console.log(error))

  // node mailer implementation begins here
  const mail_options = {
    from: `"Hands Together Test" <test@test.io>`,
    to: customer_email,
    subject: "nodemailer test",
    html: email_body, 
  }

  transporter.sendMail(mail_options, function(error, info) {
    if(error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
// To test webhook in development you must install the Stripe CLI
// https://stripe.com/docs/stripe-cli#install
// Then to forward output to the local route use:
// stripe listen --forward-to localhost:5000/stripe/webhook
router.post('/webhook', (req, res) => {
  const payload = req.rawBody;
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.WEBHOOK_ENDPOINT);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    return res.status(400).json(`Webhook Error: ${err.message}`);
  }

  if(event.type == 'checkout.session.completed') {
    const session = event.data.object;
    fulfillOrder(session);
    console.log(session);
  }

  
  res.status(200);
  res.json("Received Request");
});

module.exports = router;