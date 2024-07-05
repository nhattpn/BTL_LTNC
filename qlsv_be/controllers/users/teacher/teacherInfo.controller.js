const teacher = require('../../../models/teacher.model');

//***************/
// route: "/teacher/dashboard"
//***************/

module.exports.dashboard = async (req, res) => { //get ../teacherinfo
    const {userId} = req.user
    try {
        const tea = await teacher.findOne({"userId": userId})
        .select({"password": 0, "passwordChanged": 0});
        res.json(tea); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};

module.exports.updatePicture = async (req, res) => {// post: ../teacherinfo/updatePicture
  const { userId } = req.user;

  if (!req.file) {
    return res.status(400).send('No image file provided');
  }

  const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedFormats.includes(req.file.mimetype)) {
    return res.status(400).send('Invalid file format. Only JPEG, PNG, and JPG are allowed.');
  }

  try {
    const find_filter = { userId: userId };
    const update_filter = {
      $set: {
        image: req.file.path,
        imageLastUpdate: new Date()
      }
    };
    const update_option = { new: true };
    const updatedUser = await teacher.findOneAndUpdate(find_filter, update_filter, update_option);
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({
      message: 'Profile picture updated successfully',
      image: req.file.path,
      imageLastUpdate: updatedUser.imageLastUpdate
    });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).send('Server error');
  }
};

module.exports.updateTeacher = async (req, res) => { //put ../teacherinfo
    const {userId} = req.user
    try {
        const teacherUpdated = {
            name: req.body.name,
            email: req.body.email,
            private_info: req.body.private_info,
            contact_info: req.body.contact_info
        }

        const tea = await teacher.updateOne({ "userId": userId }, teacherUpdated, { new: true });

        if (!tea) {
            return res.status(404).send();
        }
        res.send(tea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};