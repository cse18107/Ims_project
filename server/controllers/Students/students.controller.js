const Student = require('../../models/Students/students.model');
const User = require('../../models/Users/users.model');

const createStudent = async (req,res) => {
    const {
        userId,
        rollNumber,
        batch,
        branch,
        semester,
        dob,
        category,
        gender,
        bloodGroup,
        aadharNumber,
        admissionDetails,
        communicationDetails,
    } = req.body;
    const {
        admissionYear,
        webjee_jee,
        admissionType,
        jelet_rank
    } = admissionDetails;
    const {
        fatherName,
        fatherEmail,
        motherName,
        fatherMobile,
        address,
    } = communicationDetails;
    try{
        const student = await Student(req.body);
        const user = await User.findByIdAndUpdate({_id:userId},{studentId:student._id});
        res.status(200).json({
            message:'Student created successfully',
        })
    }catch(error){
        res.status(400).json({
            message:'Student not created',
            details:error.message,
            stack:error.stack,
        });
    }
};

const getStudent = async (req,res) => {

};

const updateStudent = async (req,res) => {
    try{
        const userId = req.params.userId;
        const updatedData = {...req.body};

        await Student.findByIdAndUpdate(userId,updatedData);

        res.status(200).json({
            message:'Student is updated successfully'
        });
    }catch(error) {
        res.status(400).json({
            message:'Student is not updated',
            details:error.message,
            stack:error.stack
        });
    }
};

module.exports = {
    createStudent,
    getStudent,
    updateStudent
}