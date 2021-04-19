const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

//database
require('./database')

//app
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

//router
const userRouter = require('./routers/userRouter')

app.use('/api/v1', [userRouter])

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: 'Welcome to my world'
    })
})

module.exports = app