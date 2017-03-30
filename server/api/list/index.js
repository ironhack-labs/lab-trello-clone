'use strict';

var express = require('express');
var controller = require('./list.controller');

var router = express.Router();

router.get('/', controller.getLists);
router.post('/', controller.createList);
router.put('/:id', controller.editList);
router.delete('/:id', controller.removeList);

module.exports = router;