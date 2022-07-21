const express = require('express')

const { updateUser, deleteUser, getUser, getUsers, getUserStats, createUsers } = require('../controllers/userController');
const { authorizedToken, authorizedAdminToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users
// router.get('/', getUsers)

// // Create user
// router.get('/', authorizedToken, createUsers)

// Get user
router.get('/find/:id', authorizedAdminToken, getUser)

// Get user
router.get('/', authorizedAdminToken, getUsers)

// Update user
router.put('/:id', authorizedToken, updateUser)

// Delete user
router.delete('/:id', authorizedToken, deleteUser)

// Get User Stats
router.get('/stats', authorizedAdminToken, getUserStats)


module.exports = router