const express = require('express');
const router = express.Router()

const {
    addExpense, addIncome,
    getAllUserTransactions,
    getAllUserTransactionsByMonth,
    getUserTransactions,
    getUserTransactionsByMonth }
    = require('../controllers/transactions_controller')

//specific routes
router.get('/:transaction_type/:id' , getUserTransactions) //get expenses or incomes from user
router.get('/month/:date/:id', getAllUserTransactionsByMonth) // get all user transactions
router.get('/:month/:transaction_type/:id', getUserTransactionsByMonth) //

//general routes
router.post('/expense', addExpense)
router.post('/income', addIncome)
router.get('/:id', getAllUserTransactions) // get all user transactions

module.exports = router;