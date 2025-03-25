"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | passenger API
------------------------------------------------------- */
const router = require('express').Router()
const permissions = require('../middlewares/permissions')
const passenger = require('../controllers/passenger')
/* ------------------------------------------------------- */

// URL: /flights

router.use(permissions.isStaffOrAdmin)

router.route('/')
    .get(passenger.list)
    .post(passenger.create)

router.route('/:id')
    .get(passenger.read)
    .put(passenger.update)
    .patch(passenger.update)
    .delete( passenger.delete)

/* ------------------------------------------------------- */
module.exports = router