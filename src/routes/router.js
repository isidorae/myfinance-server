const express = require('express')
const router = express.Router()

const transactionsRouter = require('./transactions')
const userRouter = require('./user')

router.use('/transactions', transactionsRouter)
router.use('/user', userRouter)

module.exports = router;