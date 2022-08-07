const express = require('express');
const signUpUser = require('../../controllers/Users/signup.controller');

const router = express.Router();

router.route('/sign-up').post(signUpUser);

module.exports = router;