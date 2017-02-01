const mongoose = require('mongoose');
const ExampleSchema = require('./schemas/example')
const Example = mongoose.model('Blog', ExampleSchema)

module.exports = Example
