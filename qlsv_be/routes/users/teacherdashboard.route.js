const express = require('express');
const router = express.Router();
const teacherInfo = require('../../controllers/users/teacher/thongtingv.controller');
const Student = require('../../controllers/users/teacher/Student.controller');

const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../../configs/cloudinary')
const multer = require('multer');

//***************/
// route: "/teacher"
//***************/

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'image',  // Thay 'desired_folder_name' bằng tên folder bạn chọn
    allowedFormats: ['jpeg', 'png'],  // Định dạng file cho phép
    public_id: (req, file) => file.originalname  // Sử dụng tên file gốc làm public ID
  }
});

const upload = multer({ storage: storage });

// Route to update a student's information and handle image upload
router.post('/teacherinfo/updatePicture', upload.fields([{name: 'img', maxCount: 1}]), (req, res) => {
  const link_img = req.files['img'][0]
  res.send(link_img);
});


const bangdieukhienRoute = require('./bangdieukhien.route')

router.get('/teacherinfo',teacherInfo.dashboard);
router.put('/teacherinfo',teacherInfo.updateTeacher);
router.use('/Student',Student.dashboard);
//router.post('/teacherinfo/updatePicture', upload.single('image'), teacherInfo.updatePicture);


//use route
router.use('/bangdieukhien', bangdieukhienRoute)




module.exports = router;