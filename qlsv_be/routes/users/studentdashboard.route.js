const express = require('express');
const { body } = require('express-validator');
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
    folder: 'image',  // Thay 'desired_folder_name' bằng tên folder bạn chọn
    allowedFormats: ['jpeg', 'png', 'jpg'],  // Định dạng file cho phép
    public_id: (req, file) => file.originalname  // Sử dụng tên file gốc làm public ID
  }
});

const upload = multer({ storage: storage });

// Route to update a student's information and handle image upload
router.post('/studentinfo/updatePicture', upload.fields([{name: 'img', maxCount: 1}]), (req, res) => {
  const link_img = req.files['img'][0]
  res.send(link_img);
});


//router
const dangkymonRoute = require('./dangkymon.route')
//*************************//

//controller
const studentInfo = require('../../controllers/users/student/studentInfo.controller');
const thongtinDaoTao = require('../../controllers/users/student/thongtindt.controller');
const tkb = require('../../controllers/users/student/tkb.controller');
const bangdiem = require('../../controllers/users/student/bangdiem.controller');
const lichthi = require('../../controllers/users/student/lichthi.controller');
const khoahoc = require('../../controllers/users/student/khoahoc.controller');
//*************************//

//get all route
router.get('/studentinfo', studentInfo.dashboard);
router.put('/studentinfo', studentInfo.updateStudent);
router.post('/studentinfo/updatePicture', upload.single('image'), studentInfo.updatePicture);
router.get('/thongtindaotao', thongtinDaoTao.getAllDaoTao);
router.get('/tkb', tkb.getTKB);
router.get('/lichthi', lichthi.getAllLichThi);
router.get('/lichthi/:semester', lichthi.getLichThi);
router.get('/bangdiem', bangdiem.getbangdiem);
router.get('/bangdiem/:semester', bangdiem.getbangdiemBySem);
router.get('/khoahoc',khoahoc.dashboard);
router.get('/khoahoc/:courseCode',khoahoc.viewCourseDescription);
//*************************//

//use route
router.use('/dangkymon', dangkymonRoute);

module.exports = router;