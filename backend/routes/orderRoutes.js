const express = require('express')
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getMyOrders, payment, getSummary, deliveredOrder, getLimitOrder, adminGetOrders } = require('../controllers/orderController')

const { authorizedToken, verifyToken, authorizedAdminToken } = require('../middleware/authMiddleware')

// Accessing express router fnx
const router = express.Router()

// Get all orders :: Admin
router.get('/', authorizedAdminToken, getOrders)

// Create order
router.post('/', authorizedToken, createOrder)

router.get('/limit5', authorizedAdminToken, getLimitOrder)

router.get('/summary', authorizedAdminToken, getSummary)

router.get('/admin', authorizedAdminToken, adminGetOrders);

// Get all user orders
router.get('/find/:userId', authorizedToken, getMyOrders)

router.get('/:id', authorizedToken, getOrder)

// Update order :: takes in the id of the product to update
router.put('/:id', authorizedAdminToken, updateOrder)

// Delete order :: takes in the id of the product to delete
router.delete('/:id', authorizedAdminToken, deleteOrder)

// Update order targeting isDelivered field
router.put('/:id/deliver', authorizedAdminToken, deliveredOrder)

// Update order targeting isPaid field
router.put('/:id/pay', authorizedToken, payment)


// export the order routers
module.exports = router