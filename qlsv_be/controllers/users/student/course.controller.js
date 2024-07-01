const course = require('../../../models/course.model')
const student = require('../../../models/student.model')
//***************/
// route: "/student/dashboard" 
//***************/

module.exports.dashboard = async (req, res) => {// get: ../course
    const {userId} = req.user
    try {
        const st = await student.findOne({ "userId": userId })
        const courseRet = st.courseEnroll;
        if (!courseRet) {
          return res.status(404).send();
        }
        res.send(courseRet);
      } catch (e) {
        res.status(400).send(e);
    }
};


//View a course's description
module.exports.viewCourseDescription = async (req, res) => {// get: ../course/:courseCode
    const {courseCode} = req.params;
    try {
      const find_filter = {"courseCode": courseCode}
      const courseRet = await course.findOne(find_filter);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
  }
}