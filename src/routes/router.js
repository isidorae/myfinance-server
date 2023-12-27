const express = require('express')
const router = express.Router()

const transactionsRouter = require('./transactions')
const categoryRouter = require('./category')

router.use('/transactions', transactionsRouter)
router.use('/category', categoryRouter)

module.exports = router;