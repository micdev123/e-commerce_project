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
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.isAdmin = Boolean(req.body.isAdmin);

            const updatedUser = await user.save();
            res.send({ message: 'User Updated', user: updatedUser });
        }
        else {
            res.status(404).send({ message: 'User Not Found' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// deleteUsers fnx :: DELETE method  :: Access
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.isAdmin === true) {
                res.status(400).send({ message: "Can't delete Admin User" });
                return;
            }
            await user.remove();
            res.send({ message: 'User Deleted' });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
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

            const accessToken = jwt.sign(
                {
                    id: savedUser._id,
                    isAdmin: savedUser.isAdmin,
                },
                process.env.JWT_SECRET,
                {expiresIn: '3d'}
            )

            const { ...others } = updatedUser._doc;

            res.send({...others, token: accessToken,});
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
module.exports = {
    getUser,
    getUsers,
    updateUser,
    updateProfile,
    deleteUser,
    // getUserStats
}