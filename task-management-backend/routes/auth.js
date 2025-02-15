const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User'); // Import your User model
const bcrypt = require('bcrypt'); // For password hashing

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body; // Get username and password from request body

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newUser = new User({
            username,
            password: hashedPassword, // Store the hashed password
            registrationId: uuidv4(),
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // User not found
        }

        const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Password incorrect
        }

        // ... (Generate and send JWT as before)
    } catch (error) {
        // ... error handling
    }
});

// ... other authentication routes

module.exports = router;