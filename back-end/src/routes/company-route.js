'use strict';
//imports
const express = require('express');
const router = express.Router();
//controller
const controller = require('../controllers/company-controller');
//utils
//const authService = require('../services/auth-service');
//methods get
router.get('/getAll', controller.getAll);
router.get('/getById', controller.getById);
//methods get
router.get('/create', controller.create);
//export
module.exports = router;
