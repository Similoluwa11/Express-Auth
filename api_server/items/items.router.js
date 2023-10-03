const express = require('express');
const middleware = require('./items.middleware.js')
const controller = require('./items.controller.js')
const globalMiddleware = require('../middleware.js')

const router = express.Router();

router.use(globalMiddleware.apiKeyAuth)
//POST item
router.post('/', globalMiddleware.checkAdmin, middleware.checkSize,controller.createItem)
//GET items
router.get('/', controller.getItems)
//GET one item /items/id
router.get('/:id', controller.getOneItem)
//Update item
router.patch('/:id', globalMiddleware.checkAdmin, controller.updateItem)
//Delete item
router.delete('/:id', globalMiddleware.checkAdmin, controller.deleteItem)

module.exports = router 

