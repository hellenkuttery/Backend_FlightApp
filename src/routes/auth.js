"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const router = require('express').Router()
const { login,  logout } = require('../controllers/auth')
/* ------------------------------------------------------- */

// URL: /auth

router.route('/login').post(login)

router.get('/logout', logout)


/* ------------------------------------------------------- */
module.exports = router