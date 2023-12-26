const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const router = require('./src/routes/router')

const app = express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const API_URL = process.env.API_URL

app.use(express.json()); //parse json data
app.use(morgan('tiny'))

app.use(`${API_URL}/`, router)

app.get(`${API_URL}/hi`, (req, res) => {
    const product = {
        id: 1,
        name: "hi"
    }
    res.send(product)
})

mongoose.connect(MONGO_URI).then(() => console.log('connected!'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})