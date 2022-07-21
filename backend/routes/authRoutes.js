const express = require('express');

const { registerUser, loginUser } = require('../controllers/authController')

const router = express.Router();

// Register new user
router.post('/register', registerUser)

// Login User
router.post('/login', loginUser)


module.exports = router