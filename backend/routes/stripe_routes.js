var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_51IMhDjDACjkjrvMmiJxcdbJqejCQ3W9dwagP8gDp7l5wHk0Qm7oWgkmOKVqxVMOutTF7nKoPI86eX84PY6ZZqQj100pJsabLN1');
// app.js already makes these routes start at /donate!

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