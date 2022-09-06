const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "rakhitshrivastava2698@gmail.com";

// Create a new user
router.post('/createUser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        return res.status(409).json({ message: "User already exists" });
    }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = await User({ email, password:  encryptedPassword}).save();
        const data = {
            newUser: {
                id: newUser.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.status(200).json({success, token});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }

});

// User login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ success, message: "Invalid credentials" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ success, message: "Invalid credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.status(200).json({success, token});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

// Get user
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;