const User = require("../../models/Users/users.model");
const constants = require("../../utils/constants");
const sendMail = require("../../utils/emailService");
const crypto = require('crypto');

const generateJWTForForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ collage_email: email });
    if (!user) {
      return res.status(401).json({
        status: "Failed",
        message: constants.USER_NOT_EXIST,
      });
    }
    const forgetPasswordToken = await user.getForgetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const frontendLink = `http://localhost:3000/forgetpassword/${forgetPasswordToken}`;

    const html = `
            <div style="width:100%; height:100px; display:flex; justify-content:center; align-items:center; background-color:aqua; color:white;">
                <div><a href=${frontendLink}>Click On the Link</a></div>
            </div>
        `;

    await sendMail({ email, subject: "Reset password", html });

    res.status(200).json({
      message: "request sent for forget password",
      token:forgetPasswordToken
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const resetToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      forgetPasswordToken: resetToken,
      forgetPasswordExpirationTime: { $gte: Date.now() },
    });
    console.log("reset", user);
    if(!user){
        return res.status(400).json({
            status:'Failed',
            message:"Reset Password token is invalid of has been expired"
        })
    }

    user.password = password;
    user.forgetPasswordExpirationTime = null;
    user.forgetPasswordToken = null;
    
    await user.save();

    res.status(200).json({
        message:'Password updated successfully',
    })
  } catch (error) {
    res.status(400).json({
        message:error.message,
    })
  }
};

module.exports = {generateJWTForForgetPassword,resetPassword};
