const jwt = require('jsonwebtoken'); // Or your preferred method
const express = require('express');
const router = express.Router(); // Define the router
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded.user; // Add user info to request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

router.post('/register', async (req, res) => { // Add async here
    try {
        const newUser = new User(req.body);
        newUser.registrationId = uuidv4(); // Generate and assign a UUID
        await newUser.save(); // Now await is allowed
        res.status(201).json(newUser); // Send the new user back to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = authMiddleware;