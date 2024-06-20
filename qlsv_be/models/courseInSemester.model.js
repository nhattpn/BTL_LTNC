const mongoose = require('mongoose');

const courseSemesterSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true,
        unique: true
    },
    semester: {type: String, ref: 'course'},
    courseCode: {type: String, ref: 'course'},
    courseName: {type: String, ref: 'course' },
    credit: {type: Number, ref: 'course'},
    classroom: { type: String, ref: 'course' },
    enrollment: {type: Number, ref: 'course'},
    capacity: {type: Number, ref: 'course'},
    userId: {type: String, ref: 'course'},
    instructorName: {type: String, ref: 'course'},
    scheduleDay: { type: String, ref: 'course' },
    scheduleTime: { type: String, ref: 'course' },
    grade: {
        lab: {type: Number, default: null},
        midterm: {type: Number, default: null},
        final: {type: Number, default: null}
    }
});

const courseSemesterModel = mongoose.model('courseSemester', courseSemesterSchema);
module.exports = courseSemesterModel;