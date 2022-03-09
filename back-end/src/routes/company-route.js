'use strict';
//imports
const express = require('express');
const router = express.Router();
//controller
const controller = require('../controllers/company-controller');
//utils
const authService = require('../services/auth-service');
//methods get
router.get('/getAll', controller.getAll);
router.get('/getById',authService.authorize, controller.getById);
router.get('/getByToken', controller.getByToken);
//methods post
router.post('/login', controller.authenticateUser);
router.post('/create', controller.create);
//methods put
router.put('/update', controller.update);
//export
module.exports = router;
