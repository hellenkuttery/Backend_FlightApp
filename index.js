"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8001

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Parse JSON:
app.use(express.json())

// Check Authentication:
app.use(require('./src/middlewares/authentication'))

// Run Logger:
// app.use(require('./src/middlewares/logger'))

// Query Handler:
app.use(require('./src/middlewares/queryHandler'))

/* ----------------------ETHEREAL EMAIL(FAKE)--------------------- */
// EMAIL - npm i nodemailer
const nodemailer=require("nodemailer")
// Create TEst Account
// nodemailer.createTestAccount().then(email=> console.log(email))
// email için console gelen email bilgimiz
// {
//     user: 'uerrwnw5mjnbfrx7@ethereal.email',
//     pass: 'kYHKGBWzrQa7yCSptH',
//     smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//     imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//     pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//     web: 'https://ethereal.email',
//     mxEnabled: false
//   }

// const transporter=nodemailer.createTransport({
//     host:"smtp.ethereal.email",
//     port:587,
//     secure:false,
//     auth:{
//          user: 'uerrwnw5mjnbfrx7@ethereal.email',
//         pass: 'kYHKGBWzrQa7yCSptH',
//     }
// })

// console.log(transporter)

// Send mail
// transporter.sendMail({
//     from:"uerrwnw5mjnbfrx7@ethereal.email",
//     to:"helen@clarusway.com",
//     subject:"Hello ",
//     text:"Hello how are you",
//     html:"<p> Hello <b> how are you</b> </p>"

// },function(error,success){
//     success ? console.log("SUCCESS",success) : console.log("ERROR",error)

// })


// Google ve yanndex maili ile
// google account > security> 2 stepverification > App password 
// const transporter=nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:"helen@clausway.com",
//         pass:"" // gmail tarafından verilen password
//     }
// })



/* -------------------------------------------------------------------------- */
// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to FLIGHT RESERVATION API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
    })
})

// Index Route:
app.use(require('./src/routes'))



/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */