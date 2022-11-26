const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51M8LOvJhy7FBwcuN7tu5Ty7lF00tktiwZJJms7jQJ6I5ktF7nEN6c4JYtlIz2YPE2AzTm8tkrF3BJcW7TFiQBa3z001RznBzs2");

router.post('/create/paymentintent', async(req, res)=> {
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount * 100,
            currency: 'usd',
            payment_method_types: ['card'],
            description: req.body.description
          });
        res.status(200).json({client_secret: paymentIntent.client_secret})
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports  = router;


