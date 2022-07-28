const User = require('../models/User')
const asyncHandler = require('express-async-handler');
const CryptoJS = require('crypto-js')


// getUser fnx :: GET method  :: Access
const getUser = asyncHandler(async (req, res) => {
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

// getUsers fnx :: GET method  :: Access private :: Admin
const getUsers = asyncHandler(async (req, res) => {
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

// updateUsers fnx :: PUT method  :: Access
const updateUser = asyncHandler(async (req, res) => {
    // If everything is correct go ahead and update user
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            
            if (req.body.password) {
                req.body.password = CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.PASS_SECRET
                ).toString();
            }

            const updatedUser = await user.save();

            res.send({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        }
        else {
            res.status(404).send({ message: 'User not found' });
        }
        // send updated user
        // res.status(200).json(updatedUser);
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// deleteUsers fnx :: DELETE method  :: Access
const deleteUser = asyncHandler(async (req, res) => {
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
// const getUserStats = asyncHandler(async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//     try {
//         // Grouping data
//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: lastYear } } },
//             {$project: { month: { $month: "$createdAt" } }},
//             { $group: { _id: "$month", total: { $sum: 1 } } }
//         ])

//         res.status(200).json(data)
//     } 
//     catch (error) {
//         res.status(500).json(error)
//     }
// })

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    // getUserStats
}