const mongoose = require('mongoose')

// Create userSchema
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        img: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        rating: { 
            type: Number, 
            required: true 
        },
        countInStock: {
            type: Number,
            required: true
        },
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", ProductSchema);