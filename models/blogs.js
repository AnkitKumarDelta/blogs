const mongoose=require('mongoose');
const { v4: uuidv4 } = require('uuid');
//uuidv4();

mongoose.connect("mongodb://127.0.0.1:27017/ankit");

const blogSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    username:String,
title:String,
content:String
});

module.exports = mongoose.model("blog",blogSchema);