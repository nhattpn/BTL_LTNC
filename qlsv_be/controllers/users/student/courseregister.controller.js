// Add a new course
const course = require('../../../models/course.model');
const student = require('../../../models/student.model')
//***************/
// route: "/student/dashboard/courseregister" 
//***************/

//View all available course
const viewAvailableCourse = async (req, res) => {// get: ../
  try {
    const select_filter = {
      midterm: 0,
      final: 0
    }
    const courseRet = await course.find().select(select_filter)
    if (!courseRet) {
      return res.status(404).send();
    }
    res.json(courseRet);
  } catch (e) {
    res.status(400).send(e);
}
}

//View all course registered
const viewCourseReg = async (req, res) => {// get: ../viewReg
  const studentId = req.user.userId
  try {
    const stu = await student.findOne({"userId": studentId});
    const courseRet = stu.courseReg
    if (!courseRet) {
      return res.status(404).send();
    }
    res.json(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

//Add a course registered
const addCourseReg = async (req, res) => {// put: ../reg/:courseCode
  const {courseCode} = req.params
  try {
      
      const studentId = req.user.userId;
      const isExist = await student.findOne({
        "userId": studentId,
        $or: [
          {"courseReg.courseCode": courseCode}
        ]
      });
      if (isExist){
        return res.status(400).send("The course has already been registered!");
      }
      const course_match = await course.findOne({courseCode: courseCode}); 
      const newCouSem = {
          courseId: course_match._id,
          semester: course_match.semester,
          courseCode: course_match.courseCode,
          courseName: course_match.courseName,
          credit: course_match.credit,
          classroom: course_match.classroom,
          enrollment: course_match.enrollment,
          capacity: course_match.capacity,
          userId: course_match.userId,
          instructorName: course_match.instructorName,
          scheduleDay: course_match.scheduleDay,
          scheduleTime: course_match.scheduleTime,
          scheduleWeek: course_match.scheduleWeek,
      }
      const find_filter = {userId: studentId};
      const update_filter = {$push: {courseReg: newCouSem} };
      const option = {new: true};
      const courseRet = await student.updateOne(find_filter, update_filter, option);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.json(courseRet);
    } catch (e) {
      res.status(400).send(e);
  } 
}

const confirmReg = async (req, res) => {// put: ../confirmReg
  const studentId = req.user.userId;
  try {
    const find_filter = {"userId": studentId};
    const update_option = {};
    const stu = await student.findOne(find_filter)
    //Add all registered course to enrolled course
    const enroll_update = {$set: {courseEnroll: stu.courseReg}}
    const addEnroll = await student.updateOne(find_filter, enroll_update, update_option)
    if (!addEnroll){
      return res.status(404).send();
    }
    //Delete old registered courses
    const reg_update = {$set: {courseReg: []} };
    const courseRet = await student.updateOne(find_filter, reg_update, update_option);
    if (!courseRet) {
      return res.status(404).send();
    }
    
    res.json(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

//Delete a course registered by a student
const deleteCourseReg = async (req, res) => {
  const { courseCode } = req.params;
  const studentId = req.user.userId; 
  try {
    const find_filter = { "userId": studentId }; 
    const update_filter = { $pull: { courseReg: { courseCode } } }; 
    const option = { new: true };
    const updatedStudent = await student.findOneAndUpdate(
      find_filter,
      update_filter,
      option
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully from student registrations' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete all course registered by a student
const deleteAllCourseReg = async (req, res) => {// delete: ../delAll
  const studentId = req.user.userId;
  try {
      const find_filter = {"userId": studentId};
      const update_filter = {$set: {courseReg: []} };
      const option = {};
      const courseRet = await student.updateMany(find_filter, update_filter, option);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
  }
}


module.exports = {
    viewAvailableCourse,
    viewCourseReg,
    addCourseReg,
    deleteCourseReg,
    deleteAllCourseReg,
    confirmReg
}