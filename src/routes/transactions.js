const express = require('express');
const router = express.Router()

const {
    addExpense, addIncome,
    getAllUserTransactions,
    getUserTransactions,}
    = require('../controllers/transactions_controller')

//specific routes
router.get('/:transaction_type/:id' , getUserTransactions) //get expenses or incomes from user

//general routes
router.post('/expense', addExpense)
router.post('/income', addIncome)
router.get('/:id', getAllUserTransactions) // get all user transactions

module.exports = router;