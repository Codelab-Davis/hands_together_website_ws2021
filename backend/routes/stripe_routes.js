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
/* Donation Handling */
router.route('/donate').get(async (req,res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.json({ client_secret: paymentIntent.client_secret });
});

// Donation form.
router.get('/', function(req, res) {
  res.render('donate');
});

// Thanks page.
router.post('/thanks', function(req, res) {
  res.render('thanks', { title: 'Thanks!' });
});

/* Successful Checkout Event Handler */
// transporter for node mailer
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dummyemailclht', // dummy email credentials
    pass: 'dummypass'
  }
});

router.post('/cancel_order', (req, res) => {
  let customer_email = "dummyemailclht@gmail.com"; //sending cancelation email to dummy email for now
  let email_body = "<h1>Order Canceled</h1> <br /> <p> Your order was sucessfully canceled! </p>";

  const mail_options = {
    from: `"Hands Together Test" <ht@shop.io>`,
    to: customer_email,
    subject: "Order Cancellation",
    html: email_body, 
  }
  transporter.sendMail(mail_options, function(error, info) {
    if(error) {
      return res.status(400).json(error);
    } else {
      return res.status(200).json('Cancellation Email Sent: ' + info.response);
    }
  });
});

const fulfillOrder = (session) => {
  let id = session.metadata['id']; // object id for mongo access
  let customer_email = session.customer_details['email']; 
  let order_summary_url = "http://localhost:3000/order_summary/" + session.metadata['transaction_id']; 

  let email_body = "<h1>Order Placed!</h1> <br /> <p> You can view your order summary using the following url: " + order_summary_url + "</p>"; 

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
    subject: "Order Placed Successfully",
    html: email_body, 
  }

  transporter.sendMail(mail_options, function(error, info) {
    if(error) {
      console.log(error);
    } else {
      console.log('Order Email Sent: ' + info.response);
    }
  });
}

// To test webhook in development you must install the Stripe CLI
// https://stripe.com/docs/stripe-cli#install
// Then to forward output to the local route use:
// stripe listen --forward-to localhost:5000/stripe/webhook
router.post('/webhook', (req, res) => {
  console.log("In webhook")
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