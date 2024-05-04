const express = require('express');

const router = express.Router();

const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../../configs/cloudinary')
const multer = require('multer');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'file',
  allowedFormats: ['docx', 'pdf'],
});

const upload = multer({ storage: storage });


const bangdieukhienController = require('../../controllers/users/teacher/bangdieukhien.controller');

router.get('/', bangdieukhienController.dashboard);
router.get('/:courseCode', bangdieukhienController.viewStudentEnrollCourse);

router.get('/:courseCode/khoahoc', bangdieukhienController.viewCourse);
//router.post('/:courseCode/khoahoc/uploadLesson', upload.single('lessonFile'), bangdieukhienController.updateLesson);
router.post('/:courseCode/khoahoc/uploadLesson', upload.fields([{name: 'file', maxCount: 99}]), (req, res) => {
  const link_file = req.files['file'][0]
  res.send(link_file);
});

router.get('/:courseCode/sinhvien', bangdieukhienController.viewStudentEnrollCourse);
router.put('/:courseCode/sinhvien/updateGrade', bangdieukhienController.updateGradeforStudent);

module.exports = router;