const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware')
// Accessing database connection
const connectDB = require('./config/db');


const port = process.env.PORT || 5000;

// Call the connectDB fnx
connectDB();

// Initial express
const app = express();

app.use(cors());

// Middleware  :: to read body data
app.use(express.json())  // bodyparse for raw json
app.use(express.urlencoded({extended: false}))


// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'))

// User Routes
app.use('/api/users', require('./routes/userRoutes'))

// Product Routes
app.use('/api/products', require('./routes/productRoutes'))

// Cart Routes
app.use('/api/carts', require('./routes/cartRoutes'))

// Order Routes
app.use('/api/orders', require('./routes/orderRoutes'))

app.use(errorHandler)

// Listening
app.listen(port, () => console.log(`Server start at port http://localhost:${port}`))