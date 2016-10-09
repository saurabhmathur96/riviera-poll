var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userDataSchema = new Schema(
  {
  RegNo: {
    type: String,
    required: true,
    index: { unique: true }
  },
  ArtistNames: { type: [String] }
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('UserData', userDataSchema);
