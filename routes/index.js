var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('process.env.MONGO_URI');
var Schema = mongoose.Schema;
var UserData = require('../../data/user-data');
/* GET home page. */


var UserData = mongoose.model('UserData',userDataSchema);



module.exports = router;
