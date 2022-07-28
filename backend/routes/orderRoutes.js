const express = require('express')
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getMyOrders, payment, getSummary } = require('../controllers/orderController')

const { authorizedToken, verifyToken, authorizedAdminToken } = require('../middleware/authMiddleware')

// Accessing express router fnx
const router = express.Router()


// Creating a route

// Get all orders :: Admin
router.get('/', authorizedAdminToken, getOrders)


// Create order
router.post('/', authorizedToken, createOrder)


router.get('/summary', authorizedAdminToken, getSummary)

// Get all user orders
router.get('/find/:userId', authorizedToken, getMyOrders)

router.get('/:id', authorizedToken, getOrder)


// Update order :: takes in the id of the product to update
router.put('/:id', authorizedAdminToken, updateOrder)

// Delete order :: takes in the id of the product to delete
router.delete('/:id', authorizedAdminToken, deleteOrder)


router.put('/:id/pay', verifyToken, payment)



// export
module.exports = router