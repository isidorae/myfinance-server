const express = require('express');
const router = express.Router()

const { getUserTransactionsCategory }
    = require('../controllers/transactions_controller')

//specific routes
router.get('/:transaction/:category/:id', getUserTransactionsCategory) //filter by category

module.exports = router;