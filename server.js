// server.js
require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allows your GitHub Pages site to talk to this server

// Initialize Razorpay with keys from .env file
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ROUTE: Create an Order
// The frontend calls this to get an Order ID
app.post('/create-order', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const options = {
            amount: amount * 100, // Razorpay works in paise (₹1 = 100 paise)
            currency: currency || "INR",
            receipt: "order_rcptid_" + Date.now()
        };

        const order = await razorpay.orders.create(options);
        
        // We send the Order ID back to the frontend
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});