const mongoose = require('mongoose');

const academicsSchema = new mongoose.Schema({
    tenRes:{
        degreeName:{
            type:String,
            require:[true,'Please enter your degree name'],
        },
        instituteName:{
            type:String,
            require:[true,'Please enter your institute name'],
        }
    },
    twelveRes:{

    },
    graduationRes:{

    }
});