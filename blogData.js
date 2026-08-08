import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    creator: {
        type:String,
        ref: 'User',
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    }
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);