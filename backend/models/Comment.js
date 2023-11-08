// Import the Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose Schema for the 'Comment' model
const CommentSchema = new mongoose.Schema({
    // 'comment' field with a String data type that is required
    comment: {
        type: String,
        required: true,
    },
    // 'author' field with a String data type that is required
    author: {
        type: String,
        required: true,
    },
    // 'postId' field with a String data type that is required
    postId: {
        type: String,
        required: true,
    },
    // 'userId' field with a String data type that is required
    userId: {
        type: String,
        required: true,
    }
}, {
    // Automatically generate 'createdAt' and 'updatedAt' timestamps
    timestamps: true
});

// Export the Mongoose model named "Comment" with the defined schema
module.exports = mongoose.model("Comment", CommentSchema);
