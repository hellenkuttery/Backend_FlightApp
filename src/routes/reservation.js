"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const router = require('express').Router()
const reservation = require('../controllers/reservation')
const permissions = require('../middlewares/permissions')

/* ------------------------------------------------------- */

// URL: /reservations

router.use(permissions.isStaffOrAdmin)


router.route('/')
    .get(reservation.list)
    .post(reservation.create)

router.route('/:id')
    .get(reservation.read)
    .put(reservation.update)
    .patch(reservation.update)
    .delete(reservation.delete)

/* ------------------------------------------------------- */
module.exports = router