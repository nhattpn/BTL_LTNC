const student = require("../../../models/student.model");
const course = require("../../../models/course.model");
//***************/
// route: "/student/dashboard" 
//***************/

// Get all tkb of all courseEnrolled
const getTKB = async (req, res) => {// get: ../tkb
    const {userId} = req.user
    try {
        const sv_filter = {"userId": userId};
        const st = await student.aggregate([
            //Get student with userId
            {$match: sv_filter},
            //Bring out elements inside courseEnrolled 
            //of the student
            {$unwind: "$courseEnroll"},
            {$replaceRoot: {newRoot: "$courseEnroll"} },
            //Left outer join with course model
            //and store result in tkb array
            {$lookup: {
                from: course.collection.collectionName,
                localField: "courseCode",
                foreignField: "courseCode",
                as: "tkb",
            }},
            //Bring out elements inside tkb
            {$unwind: "$tkb"},
            {$replaceRoot: {newRoot: "$tkb"} },
            //Get needed info
            {$project: {
                "_id": 0,
                "semester": 1,
                "courseCode": 1,
                "credit": 1,
                "tuitionCredits": 1,
                "scheduleDay": 1,
                "scheduleTime": 1,
                "scheduleWeek": 1,
                "classroom": 1,
            }}
        ]);
        res.json(st);
    } catch (error) {
        res.json({ message: error });
    }
};


module.exports = { getTKB};