const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:[true,'Please enter your category'],
    },
    Description:{
        type:String,
        require:[true,'Please enter your description'],
    },
    achievement:{
        type:String,
        require:[true,'Please enter your achievement'],
    },
    date:{
        type:Date,
        require:[true,'Please enter your date of achievements'],
    },
    certificate:{
        public_id:{
            type:String,
            require:false,
        },
        url: {
            type:String,
            require:false,
        },
    }
});

const Achievement = mongoose.Model('Achievement',achievementSchema);