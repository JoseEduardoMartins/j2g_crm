'use strict';
//imports
const express = require('express');
const router = express.Router();
//controller
const controller = require('../controllers/customerPhone-controller');
//utils
//const authService = require('../services/auth-service');
//methods get
router.get('/get', controller.get);
router.get('/getById', controller.getById);
//methods post
router.post('/set', controller.set);
//methods put
router.put('/update', controller.update);
//export
module.exports = router;
