const student = require('../../../models/student.model');

//***************/
// route: "/student/dashboard" 
//***************/

module.exports.dashboard = async (req, res) => {// get: ../studentinfo
  const {userId} = req.user; 
  try {
        const studentinfo = await student.findOne({
          "userId": userId
        });
        res.status(200).json({studentinfo}); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};

module.exports.updatePicture = async (req, res) => {// post: ../studentinfo/updatePicture
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
    const updatedUser = await student.findOneAndUpdate(find_filter, update_filter, update_option);

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

// Update an existing student
module.exports.updateStudent = async (req, res) => {// put: ../studentinfo
  const {userId} = req.user
  try {
    const studentUpdated = {
      name: req.body.name,
      image: req.body.image,
      private_info: req.body.private_info,
      training_info: req.body.training_info,
    }

    const stu = await student.findOneAndUpdate({ userId: userId }, studentUpdated, { new: true });

    if (!stu) {
      return res.status(404).json({ message:'Failed to update student!'});
    }
    res.status(200).json({ message: 'Update successfully.'});
  } catch (e) {
      res.status(400).send(e);
  }
};