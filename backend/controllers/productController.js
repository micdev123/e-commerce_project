const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')

// Create product :: POST request : endpoint /api/products :: access public
const createProduct = asyncHandler(async (req, res) => {
    // Get all properties
    const newProduct = new Product(req.body)

    try {
        // Save new product in database
        const productSaved = await newProduct.save()
        res.status(200).json(productSaved)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


// Search product
const searchProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } 
    catch (error) {
        res.status(500).json(error)
    }
    
})


// Get a single product :: GET request : endpoint /api/products :: access public
const getProduct = asyncHandler(async (req, res) => {
    try {
        // find user by id
        const product = await Product.findById(req.params.id)

        res.status(200).json(product);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// Get all products :: GET request : endpoint /api/products :: access public
const getProducts = asyncHandler(async (req, res) => {
    // const queryByNew = req.query.new;
    const queryByCategory = req.query.search;

    try {
        const products = await Product.find();
        
        res.status(200).json(products)
    } 
    catch (error) {
        res.status(500).json(error)
    }
    
})

// Update product :: PUT request : endpoint /api/products/:id :: access private :: Admin
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, 
        { new: true }
        )

        // send updated product
        res.status(200).json(updatedProduct);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// delete product :: DELETE request : endpoint /api/products/:id :: access private :: Admin
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        // find the user by id and delete it
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: `Product: ${req.params.id} deleted`})
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


// export product controllers
module.exports = {
    getProduct,
    searchProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}