'use strict';
//imports
const express = require('express');
const router = express.Router();
//controller
const controller = require('../controllers/email-controller');
//utils
//const authService = require('../services/auth-service');
//methods get
router.get('/getAll', controller.getAll);
router.get('/getById', controller.getById);
//methods post
router.post('/create', controller.create);
//methods put
router.put('/update', controller.update);
//export
module.exports = router;
