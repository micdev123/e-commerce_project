const express = require('express');
const { payment } = require('../controllers/stripeController');

const router = express.Router();

router.post("/payment", payment);

module.exports = router;