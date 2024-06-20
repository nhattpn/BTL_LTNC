const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); //Upload image

const teacherController = require('../../controllers/admin/teacher.controller');
//***************/
// route: "/admin/dashboard/teacher" 
//***************/

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')  // Store files in the 'uploads' folder
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-gv_admin-' + Date.now() + path.extname(file.originalname))  // Create a unique file name
    }
});

const upload = multer({ storage: storage });

// Route to update a student's information and handle image upload
router.post('/upload/:userId', upload.single('image'), teacherController.updateTeacher);

router.get('/', teacherController.getAllTeachers);
router.post('/add', teacherController.addTeacher);
router.put('/:userId', teacherController.updateTeacher);
router.delete('/:userId', teacherController.deleteTeacher);
router.get('/:userId', teacherController.findTeacherByuserId);

module.exports = router;