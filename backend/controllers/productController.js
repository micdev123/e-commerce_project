const asynHandler = require('express-async-handler')
const data = require('../data.js')
const Product = require('../models/Product')

// Create product :: POST request : endpoint /api/products :: access public
const createProduct = asynHandler(async (req, res) => {
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


// Get a single product :: GET request : endpoint /api/products :: access public
const getProduct = asynHandler(async (req, res) => {
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
const getProducts = asynHandler(async (req, res) => {
    // const queryByNew = req.query.new;
    // const queryByCategory = req.query.category;

    try {
        // let products;
        // if(queryByNew) {
        //     products = await Product.find().sort({ createdAt: -1 }).limit(5);
        // }
        // else if(queryByCategory) {
        //     products = await Product.find({ categories : { $in: [queryByCategory] } })
        // }
        // else {
        //     products = await Product.find();
        // }
        const products = await Product.find();
        
        res.status(200).json(products)
    } 
    catch (error) {
        res.status(500).json(error)
    }
    
})

// Update product :: PUT request : endpoint /api/products/:id :: access private :: Admin
const updateProduct = asynHandler(async (req, res) => {
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
const deleteProduct = asynHandler(async (req, res) => {
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
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}