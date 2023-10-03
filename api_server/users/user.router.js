const express = require('express');
const middleware = require('./user.middleware')
const controller = require('./user.controller')

const router = express.Router();

router.post('/', middleware.validateUserCreation, controller.createUser)


module.exports = router