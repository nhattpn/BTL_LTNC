const express = require('express');
const controlPanelController = require('../../controllers/admin/control_panel.controller');

const router = express.Router();
//***************/
// route: "/admin/dashboard/controlpanel" 
//***************/
// Get all courses
router.get('/courses', controlPanelController.getAllCourses);

// Get a courses
router.get('/courses/:courseCode', controlPanelController.getCourse);

// Add a new course
router.post('/courses', controlPanelController.addCourse);

// Update an existing course
router.put('/courses/:courseCode', controlPanelController.updateCourse);

// Delete a course
router.delete('/courses/:courseCode', controlPanelController.deleteCourse);

module.exports = router;
