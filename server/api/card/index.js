'use strict';

var express = require('express');
var controller = require('./card.controller');

var router = express.Router();

router.post('/', controller.createCard);
router.put('/:id', controller.editCard);
router.put('/:id/transfer', controller.transferCard);
router.delete('/:id', controller.removeCard);

module.exports = router;