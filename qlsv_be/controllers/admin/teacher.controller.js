const Teacher = require('../../models/teacher.model');
const { generateUniqueUserId } = require ('../../helpers/generateuserid');

//***************/
// route: "/admin/dashboard/teacher" 
//***************/

// Get all teachers
const getAllTeachers = async (req, res) => { // get: ../
    try {
        const teachers = await Teacher.find().select('name userId email');;
        res.json(teachers);
    } catch (error) {
        res.json({ message: error });
    }
};

const addTeacher = async (req, res) => { // post: ../add
    try {
        const { name, email, private_info, training_info } = req.body;

        // Generate new userId
        let userId = await generateUniqueUserId(true);

        // Check if email is already taken
        const existingEmail = await Teacher.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email is already taken." });
        }

        const newTeacher = new Teacher({
            name,
            email,
            "password": "123456",
            userId,
            private_info,
            training_info
        });

        await newTeacher.save();
        res.status(201).json({ message: "Teacher add successfully", newTeacher });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const deleteTeacher = async (req, res) => { // delete: ../:userId
    const { userId } = req.params;

    try {
        const deletedTeacher = await Teacher.findOneAndDelete({ userId: userId });
        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found." });
        }

        res.status(200).json({ message: "Teacher deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTeacher = async (req, res) => { // put: ../:userId
    try {
        const teacherUpdated = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image,
            private_info: req.body.private_info,
            contact_info: req.body.contact_info
        }

        const teacher = await Teacher.findOneAndUpdate({ userId: req.params.userId }, teacherUpdated, { new: true });

        if (!teacher) {
            return res.status(404).json({ message: 'Failed to update teacher!'});
        }
        res.status(200).json({ message: 'Update successfully.'});  // No content to send back, but indicate success
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Find a teacher by userId
const findTeacherByuserId = async (req, res) => { // get: ../:userId
    const { userId } = req.params;

    try {
        const teacher = await Teacher.findOne({ userId: userId });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found." });
        }

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getAllTeachers,
    addTeacher,
    deleteTeacher, 
    updateTeacher,
    findTeacherByuserId
}