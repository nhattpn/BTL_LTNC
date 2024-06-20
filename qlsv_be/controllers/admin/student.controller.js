const Student = require('../../models/student.model');
const { generateUniqueUserId } = require('../../helpers/generateuserid');


//***************/
// route: "/admin/dashboard/student" 
//***************/

// Get all students
const getAllStudents = async (req, res) => { // get: ../
    try {
        const students = await Student.find().select('name userId email');;
        res.json(students);
    } catch (error) {
        res.json({ message: error });
    }
};

// Add a new student
const addStudent = async (req, res) => { // post: ../add
    try {
        const { name, email, private_info, training_info } = req.body;

        // Generate new userId
        let userId = await generateUniqueUserId(false);

        // Check if email is already taken
        const existingEmail = await Student.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email is already taken." });
        }

        const newStudent = new Student({
            name,
            email,
            "password": "123456",
            userId,
            private_info,
            training_info
        });

        await newStudent.save();
        res.status(201).json({ message: "Student add successfully", newStudent });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete a student
const deleteStudent = async (req, res) => { // delete: ../:userId
    const { userId } = req.params;

    try {
        const deletedStudent = await Student.findOneAndDelete({ userId: userId });
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json({ message: "Student deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing student
const updateStudent = async (req, res) => { // put: ../:userId
    try {
        const studentUpdated = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            userId: req.body.userId,
            image: req.body.image,
            private_info: req.body.private_info,
            training_info: req.body.training_info,
            courseReg: req.body.courseReg,
            courseEnroll: req.body.courseEnroll
        }

        const student = await Student.findOneAndUpdate({ userId: req.params.userId }, studentUpdated, { new: true });

        if (!student) {
            return res.status(404).json({ message:'Failed to update student!'});
        }
        res.status(200).json({ message: 'Update successfully.'});  // No content to send back, but indicate success
    } catch (e) {
        res.status(400).send(e);
    }
};

// Find a student by userId
const findStudentByuserId = async (req, res) => { // get: ../:userId
    const { userId } = req.params;

    try {
        const student = await Student.findOne({ userId: userId });
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }
        
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllStudents,
    addStudent,
    deleteStudent,
    updateStudent,
    findStudentByuserId
}


