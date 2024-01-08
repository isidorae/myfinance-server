const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const router = require('./src/routes/router')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const API_URL = process.env.API_URL

const corsOptions = {
    // origin: ['http://localhost:5175'],
    origin: ['https://isidorae.github.io', 'http://localhost:5173'],
    credentials: true
}

app.use(cors(corsOptions))
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