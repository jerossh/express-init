const mongoose = require('mongoose');
const BlogSchema = require('./schemas/blog')
const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog
