const asynHandler = require('express-async-handler')
const Cart = require('../models/Cart')


// Create product :: POST request : endpoint /api/carts :: access public
const createCart = asynHandler(async (req, res) => {
    // Get all properties
    const newCart = new Cart(req.body)

    try {
        // Save new product in database
        const cartSaved = await newCart.save()
        res.status(200).json(cartSaved)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


// Get a single cart :: GET request : endpoint /api/carts/find/userId :: access public
const getCart = asynHandler(async (req, res) => {
    try {
        // find user by id
        const cart = await Cart.findOne({ userId: req.params.userId })

        res.status(200).json(cart);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// Get all products :: GET request : endpoint /api/carts :: access public
const getCarts = asynHandler(async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } 
    catch (error) {
        res.status(500).json(error)
    }
    
})

// Update product :: PUT request : endpoint /api/carts/:id :: access private :: Admin
const updateCart = asynHandler(async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, 
        { new: true }
        )

        // send updated product
        res.status(200).json(updatedCart);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// delete product :: DELETE request : endpoint /api/products/:id :: access private :: Admin
const deleteCart = asynHandler(async (req, res) => {
    try {
        // find the user by id and delete it
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message: `Cart: ${req.params.id} deleted`})
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


// export product controllers
module.exports = {
    getCart,
    getCarts,
    createCart,
    updateCart,
    deleteCart
}