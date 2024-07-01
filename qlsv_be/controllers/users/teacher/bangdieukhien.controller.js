const mongoose = require('mongoose')
const student = require('../../../models/student.model')
const course = require('../../../models/course.model')

//***************/
// route: "/teacher/dashboard/bangdieukhien" 
//***************/

// View all courses
module.exports.dashboard = async (req, res) => { //get: ../
  const { userId } = req.user;
  try {
    const cou = await course.aggregate([
      {//Filter documents that has userId 
        $match: { "userId": userId }
      },
      {//Left outer join with courses collection
        //and save result to array cou_info 
        $lookup: {
          from: student.collection.collectionName,
          localField: "courseCode",
          foreignField: "courseEnroll.courseCode",
          as: "cou_info",
        }
      },
      {//Get needed info
        $project: {
          semester: 1,
          courseCode: 1,
          credit: 1,
          scheduleDay: 1,
          scheduleTime: 1,
          classroom: 1,
          studentCount: { $size: "$cou_info" }
        }
      }
    ]);
    if (!cou) {
      return res.status(404).send("Cannot find courses with userId = " + userId);
    }
    res.send(cou);
  } catch (error) {
    res.send("Opps! This is failure message of bangdieukhien.");
  }
};

//View all student studying a course
module.exports.viewStudentEnrollCourse = async (req, res) => { //get ../:courseCode
  const { courseCode } = req.params;
  try {
    const find_filter = { "courseEnroll.courseCode": courseCode }
    const select_filter = {
        userId: 1,
        name: 1,
        email: 1,
        //project only the first element matched
        //find_filter in courseEnroll array
        "courseEnroll.$": 1   
    }
    const courseRet = await student.find(find_filter).select(select_filter);
    if (!courseRet) {
      return res.status(404).send();
    }
    res.send(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

//View a course's infomation
module.exports.viewCourse = async (req, res) => { //get ../:courseCode/course
  const { courseCode } = req.params;
  try {
    const find_filter = { "courseCode": courseCode }
    const courseRet = await course.find(find_filter);
    if (!courseRet) {
      return res.status(404).send();
    }
    res.send(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

//Count students studying a course
module.exports.countStudentEnrollCourse = async (req, res) => { //get ../:courseCode/student
  const { courseCode, semester } = req.params;
  try {
    const find_filter = { "courseEnroll.courseCode": courseCode, "courseEnroll.semseter": semester }
    const group_filter = {
      _id: "$courseEnroll.courseCode",
      studentCount: { $sum: 1 }
    }
    const courseRet = await student.aggregate([
      { $match: find_filter },
      { $unwind: "$courseEnroll" },
      { $group: group_filter }
    ]);
    if (!courseRet) {
      return res.status(404).send();
    }
    res.send(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

//Update grade of a course for a student
module.exports.updateGradeforStudent = async (req, res) => { //put ../:courseCode/student/updateGrade
  const {courseCode} = req.params;
  const { userId, lab, midterm, final } = req.body;
  try {
    const stu_find = { "userId": userId, "courseEnroll.courseCode": courseCode };
    const stu_update =
    {
      $set: {
        "courseEnroll.$.grade":
        {
          "lab": lab,
          "midterm": midterm,
          "final": final
        }
      }
    };
    const stu_option = {};
    const courseRet = await student.updateOne(stu_find, stu_update, stu_option);
    if (!courseRet) {
      return res.status(404).send();
    }
    res.send(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

// Update lesson method
module.exports.updateLesson = async (req, res) => { //post ../:courseCode/course/uploadLesson
  try {
    const { courseCode } = req.params;
    const { content } = req.body; // New content for the lesson
    const files = req.files; // Uploaded files

    // Find the lesson by ID and update it with new content and files
    await course.findOneAndUpdate({ "courseCode": courseCode }, { content, files });

    res.status(200).json({ message: 'Lesson updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lesson', error });
  }
};
