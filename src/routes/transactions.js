const express = require('express');
const router = express.Router()
const auth = require('../middlewares/validateToken.js')

const {
    addExpense, addIncome,
    getAllUserTransactions,
    getUserTransactions,
    deleteTransaction,}
    = require('../controllers/transactions_controller')

//specific routes
router.get('/:transaction_type/:id', auth, getUserTransactions) //get expenses or incomes from user

//general routes
router.post('/expense', auth, addExpense)
router.post('/income', auth, addIncome)
router.get('/:id', auth, getAllUserTransactions) // get all user transactions
router.delete('/:id', auth, deleteTransaction)

module.exports = router;