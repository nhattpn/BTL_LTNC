const StudentModel = require('../../../models/student.model');

module.exports.dashboard = async (req, res) => {
    try {
        const Student = await StudentModel.find()
        .select({
            _id: 0,
            name: 1,
            mssv: 1,
            email: 1,
            training_info: 1,
            courseEnroll: 1
        });
        console.log(Student);
        res.json(Student); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};