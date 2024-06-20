const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); //Upload image

const studentController = require('../../controllers/admin/student.controller');
//***************/
// route: "/admin/dashboard/student" 
//***************/
//define multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')  // Store files in the 'uploads' folder
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  // Create a unique file name
    }
});

const upload = multer({ storage: storage });

// Route to update a student's information and handle image upload
router.post('/upload/:userId', upload.single('image'), studentController.updateStudent);

router.get('/', studentController.getAllStudents);
router.post('/add', studentController.addStudent);
router.put('/:userId', studentController.updateStudent);
router.delete('/:userId', studentController.deleteStudent);
router.get('/:userId', studentController.findStudentByuserId);

module.exports = router;