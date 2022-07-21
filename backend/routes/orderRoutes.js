const express = require('express')
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrderStats } = require('../controllers/orderController')

const { authorizedToken, verifyToken, authorizedAdminToken } = require('../middleware/authMiddleware')

// Accessing express router fnx
const router = express.Router()


// Creating a route

// Create order
router.post('/', verifyToken, createOrder)

// Get all orders
router.get('/', authorizedAdminToken, getOrders)

// Get order
router.get('/find/:userId', authorizedToken, getOrder)


// Update order :: takes in the id of the product to update
router.put('/:id', authorizedAdminToken, updateOrder)

// Delete order :: takes in the id of the product to delete
router.delete('/:id', authorizedAdminToken, deleteOrder)

// Get User Stats
router.get('/income', authorizedAdminToken, getOrderStats)

// export
module.exports = router