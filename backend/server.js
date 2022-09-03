const express = require('express');
const path = require('path');
const cors = require('cors');
require('colors')
require('dotenv').config();
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

// Payment Routes
app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

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

// app.use(express.static(path.join(__dirname, '../front-end/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.resolve(__dirname, '../front-end/build/index.html'))
// );

// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });


app.use(errorHandler)

// Listening
app.listen(port, () => console.log(`Server start at port http://localhost:${port}`))