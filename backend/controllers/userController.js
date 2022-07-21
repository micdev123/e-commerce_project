const User = require('../models/User')
const asynHandler = require('express-async-handler');


// getuser fnx :: GET method  :: Access
const getUser = asynHandler(async (req, res) => {
    try {
        // find user by id
        const user = await User.findById(req.params.id)

        // destructuring
        const { password, ...others } = user._doc;

        // excluding the password
        res.status(200).json(others);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// getusers fnx :: GET method  :: Access private :: Admin
const getUsers = asynHandler(async (req, res) => {
    const query = req.query.new;
    try {
        // get all user from database using the find
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
        res.status(200).json(users)
    } 
    catch (error) {
        res.status(500).json(error)
    }

})

// updateusers fnx :: PUT method  :: Access
const updateUser = asynHandler(async (req, res) => {
    // if password encrypt it
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString();
    }

    // If everything is correct go ahead and update user
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, 
        { new: true }
        )

        // send updated user
        res.status(200).json(updatedUser);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// deleteusers fnx :: DELETE method  :: Access
const deleteUser = asynHandler(async (req, res) => {
    try {
        // find the user by id and delete it
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: `User: ${req.params.id} deleted`})
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// Get user stats
const getUserStats = asynHandler(async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        // Grouping data
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {$project: { month: { $month: "$createdAt" } }},
            { $group: { _id: "$month", total: { $sum: 1 } } }
        ])

        res.status(200).json(data)
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {
    // createUsers,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserStats
}