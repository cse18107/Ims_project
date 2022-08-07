/*-----------IMPORTING FILES AND DEPENDENCY-------------*/
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connect } = require('./config/db');
const appRoutes = require('./routes/index');

/*---------CONFIGURING ENVIRONMENT FILE PATH------------*/
dotenv.config({path:'./.env'});

/*---------EXTRACT APP FROM EXPRESS-----------*/
const app = express();

/*--------CONNECTION WITH DATABASE----------*/
connect();

/*----MIDDLEWARE------*/
app.use(express.json());
app.use(cors());
app.use('/app/1.0',appRoutes);


/*------SERVER RUNNING-------*/
app.listen(process.env.PORT||4001, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})