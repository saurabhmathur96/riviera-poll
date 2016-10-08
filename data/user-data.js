var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userDataSchema = new Schema(
  {
  RegNo: {
    type: String,
    required: true,
    index: { unique: true }
  },
  ArtistName: { type: String }
}
);

module.exports = mongoose.model('UserData', userDataSchema);
