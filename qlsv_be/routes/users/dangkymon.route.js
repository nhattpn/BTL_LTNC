const express = require('express');
//***************/
// route: "/student/dashboard/dangkymon" 
//***************/

const router = express.Router();

const dangkymonController = require('../../controllers/users/student/dangkymon.controller');


router.get('/', dangkymonController.viewAvailableCourse);
router.get('/viewReg', dangkymonController.viewCourseReg);
router.put('/reg/:courseCode', dangkymonController.addCourseReg)
router.put('/confirmReg', dangkymonController.confirmReg)
router.delete('/delOne/:courseCode', dangkymonController.deleteCourseReg)
router.delete('/delAll', dangkymonController.deleteAllCourseReg)


module.exports = router;