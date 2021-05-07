const { response } = require('express');
var express = require('express');
var uniqid = require('uniqid');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const nodemailer = require("nodemailer");
const tokenAuth = require('../jwtAuth');

var router = express.Router();
require('dotenv').config();

const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100
});

limiter.schedule(() => {
  router.route('/create-checkout-session').post(async (req, res) => {
    let transaction_id = uniqid();
    let amount = req.body.amount;
    let tax = (req.body.type == "purchase") ? (['txr_1IRmOEDACjkjrvMmvkTvvmYZ']) : [];
    let success_url = (req.body.type == "purchase") ? req.body.success_url + transaction_id : req.body.success_url;
    let line_items = []

    // All cart items with only ids and quanities
    let cart_items = { cart: [] }


    if(req.body.type == "purchase") {
      for(let i = 0;i<req.body.cart["cart"].length;i++) {
        let cart_item = JSON.parse(req.body.cart["cart"][i])
        newItem = {
          price_data: {
            currency: 'usd',
            product_data: {
              name: cart_item.name,
              images: cart_item.images,
            },
            unit_amount: cart_item.price,
          },
          quantity: 1,
          tax_rates: tax,
        }
        line_items.push(newItem);

        cart_items.cart.push({
          id: cart_item._id,
          quantity: cart_item.quantity
        });

      }
      // console.log(line_items)
    }

    if(req.body.type == "donation") {
      newItem = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: amount,
        },
        quantity: 1,
        tax_rates: tax
      }
      line_items.push(newItem)
      console.log(line_items)
    }
    
    console.log("Creating Session")
      const session = await stripe.checkout.sessions.create({
          billing_address_collection: 'required',
          shipping_address_collection: {
            allowed_countries: ['US'],
          },
          payment_method_types: ['card'], // list of payment methods
          line_items: line_items,
          metadata: {'id': req.body.item_id, 'transaction_id': transaction_id, 'type': req.body.type, 'cart': JSON.stringify(cart_items)},
          mode: 'payment',
          success_url: success_url,
          cancel_url: req.body.cancel_url,
        });

        console.log("Done Creating Session")

        res.json({ id: session.id });
  });
})


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
limiter.schedule(() => {
  router.get('/', function(req, res) {
    res.render('donate');
  });
})

limiter.schedule(() => {
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
})

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

router.post('/cancel_order', tokenAuth, (req,res) => {
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
  let id = session.metadata['id']; 
  let cart = JSON.parse(session.metadata['cart'])['cart'];
  console.log(cart)
  console.log("Fulfilling order")

  // let customer_email = session.customer_details['email']; 
  // let order_summary_url = "http://localhost:3000/order_summary/" + session.metadata['transaction_id']; 

  // let email_body = "<h1>Order Placed!</h1> <br /> <p> You can view your order summary using the following url: " + order_summary_url + "</p>"; 

  // update datebase on successful purchase (delete from items and add to sold_items)
  
  for(let i = 0;i<cart.length;i++) {
    let item_id = cart[i].id
    axios.get("http://localhost:5000/items/get_item/" + item_id)
      .then(item => {
        console.log("Got Item")
        if(item.data.quantity == cart[i].quantity) {
          axios.delete('http://localhost:5000/items/delete_item/' + item_id)
          .then(item => {
            console.log("Deleted Item")
            console.log(item.data)
            item.data['shipping_address'] = session.shipping.address;
            item.data['transaction_id'] = session.metadata['transaction_id'];
            item.data['quantity'] = cart[i].quantity;
            axios.post('http://localhost:5000/sold_items/add_item', item.data)
             .then(res => console.log(res.data))

            // Delete all the images associated with the item
            for (let j = 0; j < item.data.images.length; j++) {
              let key = {
                data: {
                  Key: item.data.name.replace(/[^a-zA-Z0-9]/g, "") + "_" + j
                }
              }
              axios.delete('http://localhost:5000/items/delete_image/', key)
                .then(() => console.log("--Image deleted--"))
            }
          })
          .catch(error => console.log(error))
        }
        else {
          let updated_data = {
            name: item.data.name,
            date_added: item.data.date_added,
            price: item.data.price,
            images: item.data.images,
            description: item.data.description,
            quantity: item.data.quantity - cart[i].quantity,
          };
          axios.post('http://localhost:5000/items/update_item/' + item_id, updated_data)
          .then(() => {
            updated_data = {
              name: item.data.name,
              date_added: item.data.date_added,
              price: item.data.price,
              images: item.data.images,
              description: item.data.description,
              quantity: cart[i].quantity,
            };
            axios.post('http://localhost:5000/sold_items/add_item', updated_data)
             .then(res => console.log(res.data))
          })
       }
     })
    
  }

  // node mailer implementation begins here
  // const mail_options = {
  //   from: `"Hands Together Test" <test@test.io>`,
  //   to: customer_email,
  //   subject: "Order Placed Successfully",
  //   html: email_body, 
  // }

  // transporter.sendMail(mail_options, function(error, info) {
  //   if(error) {
  //     console.log(error);
  //   } else {
  //     console.log('Order Email Sent: ' + info.response);
  //   }
  // });
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

  console.log(event.type);
  if(event.type == 'checkout.session.completed') {
    const session = event.data.object;
    console.log(session.metadata['type']);
    if(session.metadata['type'] == "purchase") {
      console.log(session);
      fulfillOrder(session);
    }
    else {
      console.log("Donation Handling!")
    }
  }

  
  res.status(200);
  res.json("Received Request");
});

module.exports = router;