const express = require('express');
const loginUser = require('../../controllers/Users/login.controller');

const router = express.Router();

router.route('/login').post(loginUser);

module.exports = router;