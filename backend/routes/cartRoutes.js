const express = require('express')
const { createCart, deleteCart, updateCart, getCart, getCarts } = require('../controllers/cartController')

const { authorizedToken, verifyToken, authorizedAdminToken } = require('../middleware/authMiddleware')

// Accessing express router fnx
const router = express.Router()


// Creating a route

// Create cart
router.post('/', verifyToken, createCart)

// Get cart
router.get('/find/:userId', authorizedToken, getCart)

// Get all carts
router.get('/', authorizedAdminToken, getCarts)

// Update cart :: takes in the id of the product to update
router.put('/:id', authorizedToken, updateCart)

// Delete cart :: takes in the id of the product to delete
router.delete('/:id', authorizedToken, deleteCart)


// export
module.exports = router