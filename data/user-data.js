var mongoose = require('mongoose');
var Schema = mongoose.Schema;


userDataSchema =  new Schema({
  reg_no:{type:String,required:true,index:{unique:true}},
  artist_name:{type:String}
});

module.exports = mongoose.model;
