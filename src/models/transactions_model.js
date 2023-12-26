const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        category: {type: String, required: true},
        title: {type: String, required: true},
        amount: {type: String, required: true},
        comment: {type: String},
        date: {type: String, required: true},
        transaction_type: {type: String, required: true},
        user_id: {type: String, required: true},
    },
    {
        timestamps: true,
    }
)

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction