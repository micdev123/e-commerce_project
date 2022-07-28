const express = require('express')

const { updateUser, deleteUser, getUser, getUsers } = require('../controllers/userController');
const { authorizedToken, authorizedAdminToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users
// router.get('/', getUsers)

// Get user
router.get('/', authorizedAdminToken, getUsers)

// Get User Stats
// router.get('/stats', authorizedAdminToken, getUserStats)

// Get user
router.get('/find/:id', authorizedAdminToken, getUser)


// Update user
router.put('/:id', authorizedToken, updateUser)

// Delete user
router.delete('/:id', authorizedToken, deleteUser)


module.exports = router