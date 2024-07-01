const express = require('express');
//***************/
// route: "/student/dashboard/courseregister" 
//***************/

const router = express.Router();

const courseregisterController = require('../../controllers/users/student/courseregister.controller');


router.get('/', courseregisterController.viewAvailableCourse);
router.get('/viewReg', courseregisterController.viewCourseReg);
router.put('/reg/:courseCode', courseregisterController.addCourseReg)
router.put('/confirmReg', courseregisterController.confirmReg)
router.delete('/delOne/:courseCode', courseregisterController.deleteCourseReg)
router.delete('/delAll', courseregisterController.deleteAllCourseReg)


module.exports = router;