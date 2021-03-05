var express = require('express');
var router = express.Router();
require('dotenv').config();
const stripe = require('stripe')('sk_test_51IMhDjDACjkjrvMmiJxcdbJqejCQ3W9dwagP8gDp7l5wHk0Qm7oWgkmOKVqxVMOutTF7nKoPI86eX84PY6ZZqQj100pJsabLN1');

router.route('/create-checkout-session').post(async (req, res) => {
  let domain = "http://localhost:3000/" + req.body.item_id
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'required',
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
        mode: 'payment',
        success_url: `${domain}?success=true`, // html pages to show for successful/canceled transactions
        cancel_url: `${domain}?canceled=true`,
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

module.exports = router;