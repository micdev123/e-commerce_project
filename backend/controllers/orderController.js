const asynHandler = require('express-async-handler')
const Order = require('../models/Order')


// Create order :: POST request : endpoint /api/orders :: access public
const createOrder = asynHandler(async (req, res) => {
    // Get all properties
    const newOrder = new Order(req.body)

    try {
        // Save new product in database
        const orderSaved = await newOrder.save()
        res.status(200).json(orderSaved)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// Get all orders :: GET request : endpoint /api/orders :: access public
const getOrders = asynHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } 
    catch (error) {
        res.status(500).json(error)
    }
    
})


// Get a user orders :: GET request : endpoint /api/orders/find/userId :: access public
const getOrder = asynHandler(async (req, res) => {
    try {
        // find user by id
        const UserOrders = await Order.find({ userId: req.params.userId })

        res.status(200).json(UserOrders);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


// Update order :: PUT request : endpoint /api/orders/:id :: access private :: Admin
const updateOrder = asynHandler(async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, 
        { new: true }
        )

        // send updated product
        res.status(200).json(updatedOrder);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// delete order :: DELETE request : endpoint /api/orders/:id :: access private :: Admin
const deleteOrder = asynHandler(async (req, res) => {
    try {
        // find the user by id and delete it
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message: `Order: ${req.params.id} deleted`})
    } 
    catch (error) {
        res.status(500).json(error)
    }
})



// Get user stats
const getOrderStats = asynHandler(async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        // Grouping data
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {$project: 
                { 
                    month: { $month: "$createdAt" }, 
                    sales: "$amount" 
                }
            },
            { $group: 
                { 
                    _id: "$month", 
                    total: { $sum: "$sales" } 
                } 
            }
        ])

        res.status(200).json(income)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


// export order controllers
module.exports = {
    getOrder,
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderStats
}