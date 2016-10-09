var express = require("express");
var router = express.Router();
var path = require("path");
var UserData = require(path.join(__dirname, "..", "data", "user-data"));

//var UserData = ('UserData', userDataSchema);

router.get("/", function(req, res) {

    res.render('index');

  });

/*router.post("/", function(req, res, next) {
  var item = { RegNo: null, ArtistNames: [] };
  for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        if (key === 'reg_no') {
           item.Rno = req.body[key];
        } else {
            item.ArtistNames.push(req.body[key]);
          }
      }

    }
    var data = new UserData(item);
    data.save(function (err) {
        if (err)
        {
            return res.redirect('/failure');

        }

return res.redirect('/success');

    });
});
*/
router.get("/result", function(req, res) {
  UserData.find({}, function(err, docs) {
    if (err) {
      res.redirect('/error');
    }
    res.json(docs);
  });
});

router.get("/failure", function (req, res) {
  res.render('failure');
});

router.get("/success", function (req, res) {
  res.render('success');
});

module.exports = router;
