const User = require('../../models/Users/users.model');


const signUpUser = async (req,res) => {
    try{
        const userData = {
            first_name:req.body.firstName,
            last_name:req.body.lastName,
            college_email:req.body.collegeEmail,
            password:req.body.password,
            user_role:req.body.userRole,
        }
    
        const dbUser = await User.create(userData);
    
        res.status(200).json({
            message:'SUCCESS',
            data:dbUser,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:error.message
        })
    }
};

module.exports = signUpUser;