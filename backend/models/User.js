// Import the Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose Schema for the 'User' model
const UserSchema = new mongoose.Schema({
    // 'username' field with a String data type that is required and must be unique
    username: {
        type: String,
        required: true,
        unique: true
    },
    // 'email' field with a String data type that is required and must be unique
    email: {
        type: String,
        required: true,
        unique: true
    },
    // 'password' field with a String data type that is required
    password: {
        type: String,
        required: true
    }
}, {
    // Automatically generate 'createdAt' and 'updatedAt' timestamps
    timestamps: true
});

// Export the Mongoose model named "User" with the defined schema
module.exports = mongoose.model("User", UserSchema);
