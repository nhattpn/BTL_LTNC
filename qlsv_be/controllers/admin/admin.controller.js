const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const adminModel = require('../../models/admin.model');

//***************/
// route: "/admin" 
//***************/
const login = async (req, res) => { // route: ../login
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;
    try {
        const admin = await adminModel.findOne({ email: email });
        if (!admin || admin.role !== 'admin') {
            return res.status(404).json({ message: "Invalid credentials or role" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (password!=admin.password) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Setting the session info
        req.session.isAdmin = true;
        req.session.email = admin.email;

        res.status(200).json({ message: "Login successful", token: token, userdata: admin});
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
};

const addAdmin = async (req, res) => { // route: ../dashboard/admin/add
    const { email, password, name } = req.body;
    console.log(email, password, name);
    try {
        const admin = await adminModel.findOne({ email: email });
        if (admin) {
            return res.status(409).json({ message: "Admin already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new adminModel({
            email: email,
            password: hashedPassword,
            name: name,
            role: "admin" 
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating admin", error: err.message });
    }
}

const getAllAdmin = async (req, res) => { //route: ../admin/dashboard/admin
    try {
        const admins = await adminModel.find();
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving admins", error: err.message });
    }
}

module.exports = {
    login,
    addAdmin, 
    getAllAdmin
}

