var should = require("chai").should();
var supertest = require("supertest");
var path = require("path");
var app = require(path.join(__dirname, "..", "app"));
var client = supertest(app);
//var mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URI);
var UserData = require(path.join(__dirname, "..", "data", "user-data"));


describe("index routes", function () {
    it("GET / : Serve poll form", function (done) {
        client.get("/")
        .expect(200)
        .end(function (err) {
            should.not.exist(err);
            done();
        });
    });

    // remove x to activate.
    // it -> it.
    it("POST / : Record form response", function (done) {


        var params = {
          "reg_no": "14BIT0180",
           "artist": ["artist_5", "artist_2", "artist_1"]
         };


        client.post("/")
        .type("form")
        .send(params)
        .end(function (err, res) {
            should.not.exist(err);
            res.header.location.should.include("/success");
            var query = { RegNo: params.reg_no };
            UserData.findOne(query, function (findError, doc) {
                should.not.exist(findError);
                doc.RegNo.should.equal(params.reg_no);
                doc.ArtistNames.should.be.instanceof(Array);
                doc.ArtistNames.length.should.equal(params.artist.length);
                doc.ArtistNames.should.include.members(params.artist);
            });
            done();
        });
    });

    // remove x to activate.
    // it -> it.
    it("GET /result : Serve result of poll as json", function (done) {
        client.get("/result")
        .expect(200)
        .end(function (err) {
            should.not.exist(err);
            done();
        });
    });

    after("cleanup", function (done) {
        UserData.remove({ RegNo: "14BIT0180" }, function (err) {
            should.not.exist(err);
            done();
        });
    });
});

describe("index routes - special cases", function () {

    // remove x to activate.
    // it -> it.
    it("POST / : Duplicate Entry", function (done) {
        var params = {
            "reg_no": "14BIT0180",
            "artist": ["artist_2", "artist_5"]
        };

        client.post("/")
        .type("form")
        .send(params)
        .end(function (err1, res1) {
            should.not.exist(err1);
            res1.header.location.should.include("/success");
            client.post("/")
            .type("form")
            .send(params)
            .end(function (err2, res2) {
                should.not.exist(err2);
                res2.header.location.should.include("/failure");
                done();
            });
        });
    });

    // remove x to activate.
    // it -> it.
    it("POST / : More than 3 artists selected", function (done) {
        var params = {
            "reg_no": "14BIT0179",
            "artist": ["artist_9", "artist_8",
            "artist_4", "artist_2", "artist_1"]
        };
        client.post("/")
        .type("form")
        .send(params)
        .end(function (err, res) {
            should.not.exist(err);
            res.header.location.should.include("/failure");

            UserData.find({ RegNo: params.reg_no }, function (findError, docs) {
                should.not.exist(findError);
                docs.length.should.equal(0);
            });
            done();
        });
    });

    after("cleanup", function (done) {
        var query = { RegNo: { $in: ["14BIT0180", "14BIT0179"] } };
        UserData.remove(query, function (err) {
            should.not.exist(err);
            done();
        });
    });
});
