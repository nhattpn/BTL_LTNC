// Import necessary modules and models
const Course = require('../../models/course.model');

//***************/
// route: "/admin/dashboard/controlpanel"
//***************/

// Get all courses
const getAllCourses = async (req, res) => { // get: ../courses
  // Logic to retrieve courses from the database
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getCourse = async (req, res) => { // get: ../courses:courseCode
  // Logic to retrieve courses from the database
  const courseCode = req.params.courseCode
  try {
    const course = await Course.findOne({courseCode});
    if(!course){
      return res.status(404).json({message: 'Course not found'});
    }
    res.json(course);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add a new course
const addCourse = async (req, res) => { // post: ../courses
  // Logic to add a new course to the database
  try {
    const newCourse = new Course({
        semester: req.body.semester,
        courseCode: req.body.courseCode,
        courseName: req.body.courseName,
        instructorName: req.body.instructorName,
        userId: req.body.userId,
        credit: req.body.credit,
        scheduleDay: req.body.scheduleDay,
        scheduleTime: req.body.scheduleTime,
        scheduleWeek: req.body.scheduleWeek,
        tinhchihocphi: req.body.tinhchihocphi,
        STT: req.body.STT,
        classroom: req.body.classroom,
        midterm: req.body.midterm,
        final: req.body.final,
   });
    await newCourse.save();
    res.status(201).json({message: 'Course added successfully.'});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update an existing course
const updateCourse = async (req, res) => { // put: ../courses/:courseCode 
  try {
    const courseUpdate = {
      semester: req.body.semester,
      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      instructorName: req.body.instructorName,
      userId: req.body.userId,
      credit: req.body.credit,
      scheduleDay: req.body.scheduleDay,
      scheduleTime: req.body.scheduleTime,
      scheduleWeek: req.body.scheduleWeek,
      tinhchihocphi: req.body.tinhchihocphi,
      STT: req.body.STT,
      classroom: req.body.classroom,
      midterm: req.body.midterm,
      final: req.body.final,
    };

    const course = await Course.findOneAndUpdate({ courseCode: req.params.courseCode }, courseUpdate, { new: true });

    if (!course) {
      return res.status(404).json({message: 'Course not found'});
    }
    res.status(204).json({message: 'Course updated successfully.'}); 
  } catch (e) {
    res.status(400).send(e);
  }
};


// Delete a course
const deleteCourse = async (req, res) => { // delete: ../courses/:courseCode
  try {
      const { courseCode } = req.params; 
      const deletedCourse = await Course.findOneAndDelete({ courseCode: courseCode });
      
      if (!deletedCourse) {
          return res.status(404).json({message: 'Course not found'});
      }

      res.status(204).json({message: 'Course deleted successfully.'});  // No content to send back, but indicate success
  } catch (error) {
      res.status(500).send(error.message);
  }
};

// Export the controller functions
module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
};
