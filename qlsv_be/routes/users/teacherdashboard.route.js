const express = require('express');
const router = express.Router();
const thongtinGiangVien = require('../../controllers/users/teacher/thongtingv.controller');
const SinhVien = require('../../controllers/users/teacher/SinhVien.controller');

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
router.post('/thongtingiangvien/updatePicture', upload.fields([{name: 'img', maxCount: 1}]), (req, res) => {
  const link_img = req.files['img'][0]
  res.send(link_img);
});


const bangdieukhienRoute = require('./bangdieukhien.route')

router.get('/thongtingiangvien',thongtinGiangVien.dashboard);
router.put('/thongtingiangvien',thongtinGiangVien.updateTeacher);
router.use('/SinhVien',SinhVien.dashboard);
//router.post('/thongtingiangvien/updatePicture', upload.single('image'), thongtinGiangVien.updatePicture);


//use route
router.use('/bangdieukhien', bangdieukhienRoute)




module.exports = router;