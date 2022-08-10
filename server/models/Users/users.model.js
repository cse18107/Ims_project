const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../../utils/errorHandling");
const crypto = require("crypto");

const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    require: [true, "Please enter your first name"],
  },
  studentId:{
    type:mongoose.Schema.ObjectId,
    ref:'Student',
    require:false
  },
  teacherId:{
    type:mongoose.Schema.ObjectId,
    ref:'Teacher',
    require:false
  },
  adminId:{
    type:mongoose.Schema.ObjectId,
    ref:'Admin',
    require:false
  },
  sailerId:{
    type:mongoose.Schema.ObjectId,
    ref:'Sailer',
    require:false
  },
  middle_name: {
    type: String,
    require: false,
  },
  last_name: {
    type: String,
    require: [true, "Please enter your last name"],
  },
  user_role: {
    type: String,
    enum: ["STUDENT", "TEACHER", "ADMIN"],
    default: "STUDENT",
    require: true,
  },
  college_email: {
    type: String,
    unique: true,
    require: [true, "Please enter your collage email address"],
  },
  password: {
    type: String,
    require: [true, "Please enter your password"],
    select: false,
  },
  forgetPasswordToken: String,
  forgetPasswordExpirationTime: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJWT = function () {
  return jwt.sign(
    { id: this._id, firstName: this.first_name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

UserSchema.methods.getForgetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.forgetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.forgetPasswordExpirationTime = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
