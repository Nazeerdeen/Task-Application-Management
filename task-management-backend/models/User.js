const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // ... other user fields (username, password, etc.)
    registrationId: { type: String, unique: true }, // Add the registrationId field
    // ... other user fields
});

module.exports = mongoose.model('User', userSchema); // Export the User model