const express = require('express')
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrderStats, getMyOrders, payment } = require('../controllers/orderController')

const { authorizedToken, verifyToken, authorizedAdminToken } = require('../middleware/authMiddleware')

// Accessing express router fnx
const router = express.Router()


// Creating a route

// Create order
router.post('/', verifyToken, createOrder)


// Update order :: takes in the id of the product to update
router.put('/:id', authorizedAdminToken, updateOrder)

// Delete order :: takes in the id of the product to delete
router.delete('/:id', authorizedAdminToken, deleteOrder)


router.get('/find/:id', verifyToken, getOrder)

// Get all user orders
router.get('/find/:userId', authorizedToken, getMyOrders)

// Get all orders
router.get('/', authorizedAdminToken, getOrders)

router.put('/:id/pay', verifyToken, payment)

// Get User Stats
router.get('/income', authorizedAdminToken, getOrderStats)

// export
module.exports = router