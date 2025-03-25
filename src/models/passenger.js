"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Passenger API
------------------------------------------------------- */
/* -------------------------------------------------------
    NODEJS EXPRESS | Passenger API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "flightNumber": "IS-AN-001",
    "airline": "THY",
    "departure": "ISTANBUL",
    "departureDate": "2020-10-01 10:00:00",
    "arrival": "ANKARA",
    "arrivalDate": "2020-10-01 12:00:00",
    "createdId": "652ceaa1bae9cde5e8a97522"
}
{
  "flightNumber": "IS-AN-002",
  "airline": "THY",
  "departure": "ISTANBUL",
  "departureDate": "2020-10-01 23:00:00",
  "arrival": "ANTALYA",
  "arrivalDate": "2020-10-02 03:00:00",
  "createdId": "65317b1c29b1267920ddf30d"
}
/* ------------------------------------------------------- */
// Passenger Model:

const PassengerSchema = new mongoose.Schema({

    firstName: { 
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    lastName: { 
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    gender: { 
        type: String,
        enum:[null,"M","F"],
        default: null
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email field must be required.'],
        unique: [true, 'There is this email. Email field must be unique.'],
        validate: [
            (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            "Please fill a valid email address",
        ]
    },


    createdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, { collection: 'passengers', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.model('Passenger', PassengerSchema)