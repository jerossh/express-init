const mongoose = require('mongoose');
const ExampleSchema = require('./schemas/example');
const Example = mongoose.model('Example', ExampleSchema);

module.exports = Example;
