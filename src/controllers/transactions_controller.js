const Transaction = require('../models/transactions_model')

//*********** GENERAL *********** /
const addExpense = async (req, res) => {

    const {category, title, amount, comment, date, month, transaction_type, user_id } = req.body

    try {
        
        if (category ===  "" ||date === "" || title === "" || amount === "" ) {
            return res.status(400).json({
                message: "Debes rellenar todos los campos obligatorios."
            })
        }

        if (user_id === "") {
            return res.status(500).json({
                message: "user_id not found"
            })
        }

        if (transaction_type != "expense") {
            return res.status(500).json({
                message: "error in transaction type: 'expense' expected."
            })
        }

        const newExpense = new Transaction ({
            category,
            title,
            amount,
            comment,
            month,
            date,
            transaction_type,
            user_id
        })
        
        const savedExpense = await newExpense.save();
        return res.status(200).json({
            message: 'Nuevo gasto agregado.',
            detail: savedExpense
        })
    } catch (error) {
        return res.json({
            message: 'Error agregando gasto.',
            detail: error.message
        })
    }
}

const addIncome = async (req, res) => {

    const {category, title, amount, comment, date, month, transaction_type, user_id } = req.body

    try {
        
        if (category ===  "" ||date === "" || title === "" || amount === "" ) {
            return res.status(400).json({
                message: "Debes rellenar todos los campos obligatorios."
            })
        }

        if (user_id === "") {
            return res.status(500).json({
                message: "user_id not found"
            })
        }

        if (transaction_type != "income") {
            return res.status(500).json({
                message: "error in transaction type: 'income' expected."
            })
        }

        const newIncome = new Transaction ({
            category,
            title,
            amount,
            comment,
            month,
            date,
            transaction_type,
            user_id
        })
        
        const savedIncome = await newIncome.save();
        return res.status(200).json({
            message: 'Nuevo ingreso agregado.',
            detail: savedIncome
        })
    } catch (error) {
        return res.json({
            message: 'Error agregando ingreso.',
            detail: error.message
        })
    }
}

const getAllUserTransactions = async (req, res) => {
    try {
        const user_transactions = await Transaction.find({
            user_id: req.params.id
        })

        if (!user_transactions) {
            res.status(404).send({
                message: "user not found"
            })
        }

        res.json( {
            message: "successful retrieve of all transactions",
            detail: user_transactions
        })
    } catch (error) {
        return res.json({
            message: "error retrieving all transactions",
            detail: error.message
        })
    }
}

const getAllUserTransactionsByMonth = async (req, res) => {
    try {
        const user_transactions = await Transaction.find({
            user_id: req.params.id,
            month: req.params.date
        })

        if (user_transactions.length === 0) {
            res.status(404).send({
                message: "data not found"
            })
        }

        res.json( {
            message: "successful retrieve of all transactions",
            detail: user_transactions
        })
    } catch (error) {
        return res.json({
            message: "error retrieving all transactions",
            detail: error.message
        })
    }
}


//*********** SPECIFIC *********** /
//get expenses or incomes
const getUserTransactions = async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.params.transaction_type)
        const user_expenses = await Transaction.find({
            user_id: req.params.id,
            transaction_type: req.params.transaction_type
        })
        if (!user_expenses) {
            res.status(404).send({
                message: 'user id not found'
            })
        }

        res.json({
            message: `successful retrieve of transactions type ${req.params.transaction_type}`,
            detail: user_expenses
        })

    } catch (error) {
        return res.json({
            message: `error finding user transactions type ${req.params.transaction_type}`,
            detail: error.message
        })
    }
}

//get category of expenses or incomes
const getUserTransactionsCategory = async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.params.category)
        console.log(req.params.transaction)
        const user_expenses = await Transaction.find({
            user_id: req.params.id,
            category: req.params.category,
            transaction_type: req.params.transaction
        })
        if (!user_expenses) {
            res.status(404).send({
                message: 'user id not found'
            })
        }

        res.json({
            message: `successful retrieve of category ${req.params.category}, transactions type ${req.params.transaction_type}`,
            detail: user_expenses
        })

    } catch (error) {
        return res.json({
            message: `error finding category ${req.params.category}, transactions type ${req.params.transaction_type}`,
            detail: error.message
        })
    }
}

//get category of expenses or incomes
const getUserTransactionsByMonth = async (req, res) => {
    try {
        const id = req.params.id
        const month = req.params.month
        const transaction = req.params.transaction_type
        console.log("Received request:", id, month, transaction);
        
        const user_transaction_month = await Transaction.find({
            month: month,
            transaction_type: transaction,
            user_id: id,
        })
        console.log("Query result:", user_transaction_month);
        if (user_transaction_month.length === 0) {
            res.status(404).send({
                message: 'data not found'
            })
        }

        console.log("Sending successful response.");
        res.json({
            message: `successful retrieve of transactions type ${req.params.transaction_type}, month: ${req.params.month},`,
            detail: user_transaction_month
        })

    } catch (error) {
        return res.json({
            message: `error finding transactions type ${req.params.transaction_type}, month: ${req.params.month}, user: ${req.params.id}`,
            detail: error.message
        })
    }
}

module.exports =
{ addExpense, addIncome,
 getAllUserTransactions,
 getAllUserTransactionsByMonth,
 getUserTransactions,
 getUserTransactionsCategory,
 getUserTransactionsByMonth 
 }