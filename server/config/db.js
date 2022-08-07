const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.DB).then(()=> {
        console.log('Mongoodb database is connected successfully');
    }).catch((error)=> {
        console.log(error.message);
    });
};

module.exports = { connect };