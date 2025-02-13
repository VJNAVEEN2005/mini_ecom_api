const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const connectDatabase = require('./config/connectDatabase')
const cors = require("cors");
app.use(cors());

dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const products = require('./routes/product')
const orders = require('./routes/order')
const signup = require('./routes/signup')
const login = require('./routes/login')
const cart = require('./routes/cart')

connectDatabase()

app.use(express.json())

app.use('/api/v1/',products)
app.use('/api/v1/',orders)
app.use('/api/v1/',signup)
app.use('/api/v1/',login)
app.use('/api/v1/',cart)

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});