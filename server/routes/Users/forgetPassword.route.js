const express = require('express');
const {generateJWTForForgetPassword,resetPassword} = require('../../controllers/Users/forgetPassword.controller');

const router = express.Router();

router.route('/forgetPassword/').post(generateJWTForForgetPassword);
router.route('/resetPassword/').post(resetPassword);

module.exports = router;