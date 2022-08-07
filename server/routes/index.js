const express = require('express');
const signupUserRouter = require('./Users/signup.route');
const loginUserRouter = require('./Users/login.route');
const forgetPasswordRouter = require('./Users/forgetPassword.route');


const app = express();

app.use('/', signupUserRouter);
app.use('/', loginUserRouter);
app.use('/', forgetPasswordRouter);

module.exports = app;