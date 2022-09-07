const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const fs = require('fs');

// creating storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

// creating experssion out of multer function
const upload = multer({
    storage: storage
})

// Create a new profile
router.post('/createProfile', upload.single('photo'), fetchuser, async (req, res) => {
    const { name, age, contact, address } = req.body;
    const profileAlreadyExists = await Profile.find({ contact: contact });
    if (profileAlreadyExists.length > 0) {
        return res.status(409).json({ message: "Profile already exists" });
    }
    try {
        const newProfile = await Profile({ name, age, contact, address, photo: { data: fs.readFileSync('uploads/' + req.file.filename), contentType: 'image/png' }, user: req.user.id }).save();
        res.status(200).json(newProfile);
    } catch (error) {
        console.log("Internal server error", error);
    }
});

// Read all the profiles
router.post('/readProfile', fetchuser, async (req, res) => {
    try {
        const allProfiles = await Profile.find({ user: req.user.id });
        res.status(200).json(allProfiles);
    } catch (error) {
        console.log("Internal server error", error);
    }
});

// Update a profile
router.put('/updateProfile/:id', upload.single('photo'), fetchuser, async (req, res) => {
    console.log(req.file)
    const { name, age, contact, address} = req.body;
    const updateProfile = {};
    if (name) { updateProfile.name = name };
    if (age) { updateProfile.age = age };
    if (contact) { updateProfile.contact = contact };
    if (address) { updateProfile.address = address };
    if (req.file) { updateProfile.photo = { data: fs.readFileSync('uploads/' + req.file.filename), contentType: 'image/png' } };
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
        return res.status(404).send("Not found");
    }
    if (profile.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }
    try {
        const newUpdatedProfile = await Profile.findByIdAndUpdate(req.params.id, { $set: updateProfile }, { new: true })
        res.status(200).json(newUpdatedProfile);
    } catch (error) {
        console.log("Internal server error", error);
    }
});

// Delete a profile
router.delete('/deleteProfile/:id', fetchuser, async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
        return res.status(404).send("Not found");
    }
    if (profile.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }
    try {
        const deleteProfile = await Profile.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.log("Internal server error", error);
    }
});

module.exports = router;