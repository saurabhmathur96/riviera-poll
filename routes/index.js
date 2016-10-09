var express = require("express");
var router = express.Router();
var path = require("path");
var UserData = require(path.join(__dirname, "..", "data", "user-data"));

//var UserData = ('UserData', userDataSchema);

router.get("/", function(req, res) {
    res.render('index');
});

router.post("/", function(req, res, next) {
  var error = null;


  if (req.body.reg_no == null || req.body.artist == null) {
    error = new Error("Invalid Form.");
    error.status = 400;

return next(error);
  }

  if (typeof req.body.artist === "string") {
    req.body.artist = [req.body.artist];
  }
  var item = {
    RegNo: req.body.reg_no.toUpperCase(),
    ArtistNames: req.body.artist
  };
  if (!item.RegNo.match(/[1-9]{2}[A-Z]{3}[0-9]{4}/)) {
    error = new Error("Invalid Registration Number.");
    error.status = 400;

return next(error);
  }
  if (item.ArtistNames.length > 3) {
    req.flash('error', "You can vote for atmost 3 artists.");

    return res.redirect('/failure');
  }
  var data = new UserData(item);

  data.save(function (err) {
      if (err) {
        req.flash('error', "You seem to have already voted once.");

return res.redirect('/failure');
      }
      req.flash('success', "Your response was recorded successfully.");

return res.redirect('/success');

  });
});

router.get("/result", function(req, res, next) {
  UserData.aggregate([{ $project: { "ArtistNames": 1 } },
  { $unwind: "$ArtistNames" },
  {
 $group: {
 "count": { $sum: 1 },
  _id: "$ArtistNames"
}
}
  ], function(err, docs) {
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
router.get('/analytics', function(req, res) {
    res.render('analytics');

});


module.exports = router;
