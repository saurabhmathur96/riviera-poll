var express = require("express");
var router = express.Router();
var path = require("path");
var UserData = require(path.join(__dirname, "..", "data", "user-data"));

//var UserData = ('UserData', userDataSchema);

router.get("/", function(req, res) {

    res.render('index');

  });

router.post("/", function(req, res) {
  var item = {
    RegNo: null,
    ArtistNames: []
};
  for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        if (key === 'reg_no') {
           item.RegNo = req.body[key];
        } else {
            item.ArtistNames.push(key);
          }
      }

    }

    if (item.ArtistNames.length > 3) {

      return res.redirect('/failure');
    }
    var data = new UserData(item);

    data.save(function (err) {
        if (err) {

            return res.redirect('/failure');

        }

        return res.redirect('/success');

    });
});

router.get("/result", function(req, res, next) {
  UserData.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
});

router.get("/failure", function (req, res) {
  return res.render('failure');
});

router.get("/success", function (req, res) {
  return res.render('success');
});

module.exports = router;
