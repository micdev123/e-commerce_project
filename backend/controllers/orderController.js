const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')
const User = require('../models/User')
const Product = require('../models/Product')



// Get all orders :: GET request : endpoint /api/orders :: access admin
const getOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } 
    catch (error) {
        res.status(500).json(error)
    }
    
})

// Create order :: POST request : endpoint /api/orders :: access public
const createOrder = asyncHandler(async (req, res) => {
    // Get all properties
    const newOrder = new Order(req.body);

    try {
        // Save new product in database
        const orderSaved = await newOrder.save()
        res.status(200).json(orderSaved)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


const getLimitOrder= asyncHandler(async (req, res) => {
    const query = req.query.new;
    try {
        // get all user from database using the find
        const orders = query ? await Order.find().sort({ _id: -1 }).limit(5) : await Order.find()
        res.status(200).json(orders)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})



// Get all Orders :: Admin
const PAGE_SIZE = 5;

const adminGetOrders = asyncHandler(async (req, res) => {
    try {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const orders = await Order.find().skip(pageSize * (page - 1)).limit(pageSize);
        const countOrders = await Order.countDocuments();
        res.send({
            orders,
            countOrders,
            page,
            pages: Math.ceil(countOrders / pageSize),
        });
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// Get summary stats
const getSummary = asyncHandler(async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        // Grouping data
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ]);
        
        const users = await User.aggregate([
        {
            $group: {
                _id: null,
                numUsers: { $sum: 1 },
            },
        },
        ]);
        
        const income = await Order.aggregate([
            // { $match: { createdAt: { $gte: previousMonth } } },
            {$project: 
                { 
                    month: { $month: "$createdAt" }, 
                    sales: "$totalPrice" 
                }
            },
            { $group: 
                { 
                    _id: "$month", 
                    total: { $sum: "$sales" } 
                } 
            },
            { $sort: { _id: 1 } },
        ])

        const products = await Product.aggregate([
        {
            $group: {
            _id: null,
            numProducts: { $sum: 1 },
            },
        },
        ]);

        res.status(200).json({ users, orders, income, products })
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

const PAGE__SIZE = 7;
// Get a user orders :: GET request : endpoint /api/orders/find/userId :: access public
const getMyOrders = asyncHandler(async (req, res) => {
    try {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE__SIZE;

        // find user by id
        const orders = await Order.find({ userId: req.params.userId }).skip(pageSize * (page - 1)).limit(pageSize)
        const countOrders = await Order.countDocuments();
        res.send({
            orders,
            countOrders,
            page,
            pages: Math.ceil(countOrders / pageSize),
        });

        // res.status(200).json(orders);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})



const getOrder = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        }
        else {
            res.status(404).json({ message: 'Order Not Found' });
        }
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


// Update order :: PUT request : endpoint /api/orders/:id :: access private :: Admin
const updateOrder = asyncHandler(async (req, res) => {
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
const deleteOrder = asyncHandler(async (req, res) => {
    try {
        // find the user by id and delete it
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message: `Order: ${req.params.id} deleted`})
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


const deliveredOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        await order.save();
        res.send({ message: 'Order Delivered' });
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }
})


const payment = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    //     .populate(
    //   'user',
    //   'email name'
    // );
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });  
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }
    
})




// export order controllers
module.exports = {
    getOrders,
    getLimitOrder,
    createOrder,
    adminGetOrders,
    getSummary,
    getMyOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    deliveredOrder,
    payment,
}