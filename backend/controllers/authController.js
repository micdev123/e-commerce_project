const asyncHandler = require('express-async-handler')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// User Model
const User = require('../models/User');

// Create User
const registerUser = asyncHandler(async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // using crypto-js:: hashing password
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SECRET
        ).toString()
    });

    // Saving user in database
    try {
        const savedUser = await newUser.save();
        const accessToken = jwt.sign(
            {
                id: savedUser._id,
                isAdmin: savedUser.isAdmin,
            },
            process.env.JWT_SECRET,
            {expiresIn: '3d'}
        )

        const { ...others } = savedUser._doc;

        res.status(200).json({ ...others, accessToken })
    } 
    catch (error) {
        res.status(500).json(error)
    }
   
})


// Login User
const loginUser = asyncHandler(async (req, res) => {
    try {
        // finding user in database
        const user = await User.findOne({ email: req.body.email })

        // If user not found
        !user && res.status(401).json({message: "Wrong credentials"})

        // decrypting password
        const decryptPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8);

        // If after decrypting the password but doesn't match the inputed password return this
        decryptPassword !== req.body.password && res.status(401).json({message: "Wrong credentials"})

        // creating|generating access token for user 
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {expiresIn: '3d'}
        )

        // destructuring
        const { password, ...others } = user._doc; // ._doc is used with a document

        // If everything is correct return everything else except password
        res.status(200).json({...others, accessToken})
    } 
    catch (error) {
        res.status(500).json(error)
    }
})


module.exports = {
    registerUser,
    loginUser
}