const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const User = require("../models/User");
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

router.post("/stripe/create/account", async(req, res)=> {
    try{
        console.log(req.body.userId)
        const account = await stripe.accounts.create({type: 'express', settings: {payouts: {schedule: {interval: 'manual'}}}});
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `http://localhost:3000/stripe/reauth/${account.id}`,
            return_url: 'http://localhost:3000/stripe/return',
            type: 'account_onboarding',
          });
          console.log(account.id)
          await User.findOneAndUpdate({_id: req.body.userId}, {stripeAccount: account.id})
        res.status(200).json({url: accountLink})
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});
router.post("/stripe/account/link", async (req, res)=> {
    try{
        const accountLink = await stripe.accountLinks.create({
            account: req.body.id,
            refresh_url:  `http://localhost:3000/stripe/reauth/${req.body.id}`,
            return_url: 'http://localhost:3000/stripe/return',
            type: 'account_onboarding',
          });
          res.status(200).json(accountLink)
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
});
router.post('/create-checkout-session', async(req, res)=> {
    try{
        let fees = parseInt(((100 * 20) / req.body.amount) * 100);
        const session = await stripe.checkout.sessions.create({
            line_items: [{
              price_data: {
                currency: 'usd',
                product_data: {
                    name: req.body.name
                },
                unit_amount: (req.body.amount * 100) +  fees,
              },
              quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000/payment/success/${req.body.offerId}`,
            cancel_url: `http://localhost:3000/payment/failure/${req.body.offerId}`,
            payment_intent_data: {
              application_fee_amount: fees + fees,
              transfer_data: {
                destination: req.body.destinationId,
              },
            },
          });
          res.status(200).json(session)
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})

router.post('/send/payment', async(req, res)=> {
    let am = (req.body.amount * 10) - 2;
    console.log(am);
    try{
        console.log(req.body.receiverStripeId)
        const payout = await stripe.payouts.create({
            amount: am,
            currency: 'usd',
          }, {
            stripeAccount: req.body.receiverStripeId,
          });
          res.status(200).json(payout);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})
router.post('/refund', async(req, res)=> {
    try{
        const refund = await stripe.refunds.create({payment_intent: req.body.paymentIntentId});
        res.status(200).json(refund);
    }catch(err){
        res.status(200).json(err);
    }
})
router.get('/account/:id', async(req, res)=> {
    try{
        const account = await stripe.accounts.retrieve(
            req.params.id
          );
          res.status(200).json(account);
    }catch(err){
        res.status(200).json(err)
    }
})

module.exports  = router;


