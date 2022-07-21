const express = require('express')
// Accessing controllers from controllers productController
const { getProducts, createProduct, updateProduct, deleteProduct, getProduct, uploadProducts } = require('../controllers/productController')
const { authorizedAdminToken, authorizedToken } = require('../middleware/authMiddleware')

// Accessing express router fnx
const router = express.Router()

// Creating a route

// Get product
router.get('/find/:id', getProduct);

// Get all products
router.get('/', getProducts)


// Create products
router.post('/', authorizedAdminToken, createProduct)

// Update products :: takes in the id of the product to update
router.put('/:id', authorizedAdminToken, updateProduct)

// Delete products :: takes in the id of the product to delete
router.delete('/:id', authorizedAdminToken, deleteProduct)


// export
module.exports = router