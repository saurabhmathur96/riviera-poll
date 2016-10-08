var express = require("express");
var router = express.Router();
var path = require("path");
var UserData = require(path.join(__dirname, "..", "data", "user-data"));
//var UserData = ('UserData', userDataSchema);


router.get("/result", function(req, res) {
  UserData.find({}, function(err, docs) {
    if (err) {
      res.render('error');
    }
    res.render(docs);
  });
});

module.exports = router;
