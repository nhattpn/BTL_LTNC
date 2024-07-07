const express = require('express');
const router = express.Router();

const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../../configs/cloudinary')
const multer = require('multer');

//***************/
// route: "/student/dashboard" 
//***************/

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'student_image',
    public_id: (req, file) => `SV_${req.user.userId}`,
    overwrite: true, 
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'jfif', 'avif'],
  },
});

const upload = multer({ storage: storage });

//router
const courseregisterRoute = require('./courseregister.route')
//*************************//

//controller
const studentInfo = require('../../controllers/users/student/studentInfo.controller');
const trainingInfo = require('../../controllers/users/student/trainingInfo.controller');
const schedule = require('../../controllers/users/student/schedule.controller');
const scoreboard = require('../../controllers/users/student/scoreboard.controller');
const lichthi = require('../../controllers/users/student/lichthi.controller');
const course = require('../../controllers/users/student/course.controller');
//*************************//

//get all route
router.get('/studentinfo', studentInfo.dashboard);
router.put('/studentinfo', studentInfo.updateStudent);
router.post('/studentinfo/updatePicture', upload.single('student_image'), studentInfo.updatePicture);
router.get('/traininginfo', trainingInfo.getAllDaoTao);
router.get('/schedule', schedule.getTKB);
router.get('/lichthi', lichthi.getAllLichThi);
router.get('/lichthi/:semester', lichthi.getLichThi);
router.get('/scoreboard', scoreboard.getScoreboard);
router.get('/scoreboard/:semester', scoreboard.getScoreboardBySem);
router.get('/course',course.dashboard);
router.get('/course/:courseCode',course.viewCourseDescription);
//*************************//

//use route
router.use('/courseregister', courseregisterRoute);

module.exports = router;
