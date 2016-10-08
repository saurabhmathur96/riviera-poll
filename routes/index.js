var express = require("express");
var router = express.Router();
var path = require("path");
var UserData = require(path.join(__dirname, "..", "data", "user-data"));
var item = {};
var data = {};
var Rno = 0;
var key = 0;
var ArtistNamesArray = [];
//var UserData = ('UserData', userDataSchema);

router.get("/", function(req, res) {

    res.render('index');

  });

router.post("/", function(req, res) {

  for (key in req.body) {
      if (req.body) {
        if (key === 'reg_no') {
          Rno = req.body[0];
        } else {
            ArtistNamesArray.push(req.body[key]);
          }
      }

    }
    item = {
      RegNo: Rno,
      ArtistNames: ArtistNamesArray
    };
    data = new UserData(item);
    data.save();
    res.redirect('/success');

  });
//var data = new UserData(item);


router.get("/result", function(req, res) {
  UserData.find({}, function(err, docs) {
    if (err) {
      res.redirect('/error');
    }
    res.json(docs);
  });
});

module.exports = router;
