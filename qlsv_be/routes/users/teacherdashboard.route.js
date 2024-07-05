const express = require('express');
const router = express.Router();

const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../../configs/cloudinary')
const multer = require('multer');

//***************/
// route: "/teacher/dashboard"
//***************/

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'teacher_image',
    public_id: (req, file) => `GV_${req.user.userId}`,
    overwrite: true, 
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'jfif', 'avif'],
  },
});

const upload = multer({ storage: storage });

// Route to update a student's information and handle image upload

const bangdieukhienRoute = require('./bangdieukhien.route')
//*************************//

const teacherInfo = require('../../controllers/users/teacher/teacherInfo.controller');
const Student = require('../../controllers/users/teacher/Student.controller');
//*************************//
router.get('/teacherinfo',teacherInfo.dashboard);
router.put('/teacherinfo',teacherInfo.updateTeacher);
router.post('/teacherinfo/updatePicture', upload.single('teacher_image'), teacherInfo.updatePicture);
router.use('/Student',Student.dashboard);
//*************************//

//use route
router.use('/bangdieukhien', bangdieukhienRoute)




module.exports = router;