const express = require('express');
const { body } = require('express-validator');
const adminController = require('../../controllers/admin/admin.controller');
const authenticate = require('../../middlewares/authenticate');

const router = express.Router();

//***************/
// route: "/admin" 
//***************/
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
], adminController.login);

//router.post('/addadmin', adminController.addAdmin)

router.use('/dashboard', authenticate, require('./dashboard.route'));
module.exports = router;
