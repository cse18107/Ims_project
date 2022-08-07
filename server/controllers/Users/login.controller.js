const User = require("../../models/Users/users.model");
const ErrorHandler = require("../../utils/errorHandling");
const Constant = require('../../utils/constants');
const sendMail = require('../../utils/emailService');

const loginUser = async (req,res,next) => {
    try{
        const {email,password} = req.body;

        const jwtToken = await loginUserUtil(email,password);

        console.log(jwtToken);

        res.status(200).json({
            message:Constant.SUCCESSFUL_LOGIN,
            token: jwtToken
        })
    }catch(error){
        res.status(500).json({
            status: 'Failed',
            message:error.stack
        })
    }
};

const loginUserUtil = async( email, password ) => {
    const user = await User.findOne({'college_email':email}).select("+password");
    if(!user){
        throw new Error({
            status:'Failed',
            message: Constant.USER_NOT_EXIST,
        },401);
    }
    const userPassword = await user.comparePassword(password);
    
    if(!userPassword) {
        throw new Error({
            status:'Failed',
            message: Constant.CHECK_CRED,
        },401);
    }
    const jwtToken = await user.getJWT();

    return jwtToken;
}

module.exports =loginUser; 