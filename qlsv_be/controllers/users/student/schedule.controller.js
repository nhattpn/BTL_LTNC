const student = require("../../../models/student.model");
const course = require("../../../models/course.model");
//***************/
// route: "/student/dashboard" 
//***************/

// Get all schedule of all courseEnrolled
const getTKB = async (req, res) => {// get: ../schedule
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
            //and store result in schedule array
            {$lookup: {
                from: course.collection.collectionName,
                localField: "courseCode",
                foreignField: "courseCode",
                as: "schedule",
            }},
            //Bring out elements inside schedule
            {$unwind: "$schedule"},
            {$replaceRoot: {newRoot: "$schedule"} },
            //Get needed info
            {$project: {
                "_id": 0,
                "semester": 1,
                "courseCode": 1,
                "courseName": 1,
                "classroom": 1,
                "instructorName": 1,
                "scheduleTime": 1,
                "scheduleDay": 1,
                "scheduleWeek": 1,
            }}
        ]);
        res.json(st);
    } catch (error) {
        res.json({ message: error });
    }
};


module.exports = { getTKB};