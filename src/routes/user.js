const express = require('express')
const router = express.Router()
const { registerUser, getUser, loginUser, logoutUser} = require('../controllers/user_controller')

//user data
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/:id', getUser)

module.exports = router;