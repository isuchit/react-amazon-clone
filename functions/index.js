const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51HPvesLv2wbjCv6jPYdhgdfh0NpojcsiG6EYF7EILk1RgVaXUZcXrFSEgnXlAYlyEJYFXw9tnzWMcu7YmpADu3ow00iLuOzNqC')


//api


// App config
const app = express();


//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//api routes
app.get('/', (request, response) => response.status(200).send('hello world'))


app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved", total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "inr",
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

//listen command
exports.api = functions.https.onRequest(app)
