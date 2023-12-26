const express = require('express');
const router = express.Router()

const {
    addExpense, addIncome,
    getUserTransactionsByParams,
    getUserTransactionsCategoryByParams }
    = require('../controllers/transactions_controller')

router.post('/expense', addExpense)
router.post('/income', addIncome)
router.get('/:transaction_type/:id' , getUserTransactionsByParams) //get expenses or incomes from user
router.get('/:transaction_type/:category/:id', getUserTransactionsCategoryByParams) //get category


module.exports = router;