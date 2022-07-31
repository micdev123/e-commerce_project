const express = require('express')
// Accessing controllers from controllers productController
const { getProducts, createProduct, updateProduct, deleteProduct, getProduct, searchProduct, adminGetProduct } = require('../controllers/productController')
const { authorizedAdminToken, authorizedToken } = require('../middleware/authMiddleware')

// Accessing express router fnx
const router = express.Router()

// Get all products
router.get('/', getProducts)

// Create products
router.post('/', authorizedAdminToken, createProduct)

// Get product
router.get('/find/:id', getProduct);

// Update products :: takes in the id of the product to update
router.put('/:id', authorizedAdminToken, updateProduct)

// Delete products :: takes in the id of the product to delete
router.delete('/:id', authorizedAdminToken, deleteProduct)

// Get all products :: Admin
router.get('/admin', authorizedAdminToken, adminGetProduct)


router.get('/search', searchProduct);





// export
module.exports = router