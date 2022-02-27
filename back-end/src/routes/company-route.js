'use strict';
//imports
const express = require('express');
const router = express.Router();
//utils
const controller = require('../controllers/company-controller');
const authService = require('../services/auth-service');
//methods get
router.get('/create', authService.authorize, controller.create);
//export
module.exports = router;
