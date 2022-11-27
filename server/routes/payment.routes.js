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
router.post('/start/financialconnection', async(req, res)=> {
    try{
        const session = await stripe.financialConnections.sessions.create({
            account_holder: {type: 'account', account: req.body.stripeAccount.id},
            filters: {countries: ['US']},
            permissions: ['ownership', 'payment_method', 'transactions'],

          });
          res.status(200).json(session);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

})
router.post('/addbank', async(req, res)=> {
    try{
        const account = await stripe.accounts.update(
            req.body.stripeAccountId,
            {external_account: req.body.bankId}
          );
    res.status(200).json(account);
    }catch(err){
        res.status(200).json(err);
    }
})
router.post('/send/payment', async(req, res)=> {
    try{
        const transfer = await stripe.transfers.create({
            amount: req.body.amount,
            currency: "usd",
            destination: req.body.stripeAccount,
          });
          res.status(200).json(transfer);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports  = router;


