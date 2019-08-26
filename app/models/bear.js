// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
});

var bear = mongoose.model('bear', BearSchema);
 module.exports = bear;