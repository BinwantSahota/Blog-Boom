// Import the Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose Schema for the 'Post' model
const PostSchema = new mongoose.Schema({
    // 'title' field with a String data type that is required and must be unique
    title: {
        type: String,
        required: true,
        unique: true
    },
    // 'desc' field with a String data type that is required and must be unique
    desc: {
        type: String,
        required: true,
        unique: true
    },
    // 'photo' field with a String data type that is not required
    photo: {
        type: String,
        required: false
    },
    // 'username' field with a String data type that is required
    username: {
        type: String,
        required: true
    },
    // 'userId' field with a String data type that is required
    userId: {
        type: String,
        required: true
    },
    // 'categories' field with an Array data type (no requirement specified)
    categories: {
        type: Array
    }
    
}, {
    // Automatically generate 'createdAt' and 'updatedAt' timestamps
    timestamps: true
});

// Export the Mongoose model named "Post" with the defined schema
module.exports = mongoose.model("Post", PostSchema);
