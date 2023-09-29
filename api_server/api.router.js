const express = require('express');
const middleware = require('./api.middleware')
const controller = require('./api.controller')

const router = express.Router();
//POST item
router.post('/', middleware.checkSize, controller.createItem)
//GET items
router.get('/', controller.getItems)
//GET one item /items/id
router.get('/:id', controller.getOneItem)
//Update item
router.patch('/:id', controller.updateItem)
//Delete item
router.delete('/:id', controller.deleteItem)
module.exports = router 

