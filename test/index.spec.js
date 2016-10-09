var should = require("chai").should();
var supertest = require("supertest");
var path = require("path");
var app = require(path.join(__dirname, "..", "app"));
var client = supertest(app);

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
    // xit -> it.
    xit("POST / : Record form response", function (done) {
        var params = { "reg_no": "14BIT080" };
        var artists = ["artist_5, artist_2, artist_1"];
        for (var index in artists) {
            params[artists[index]] = "on";
        }
        client.post("/")
        .type("form")
        .send(params)
        .end(function (err, res) {
            should.not.exist(err);
            res.header.location.should.include("/success");

            UserData.find({ RegNo: params.reg_no }, function (findError, docs) {
                should.not.exist(findError);
                docs.length.should.equal(1);
                docs[0].RegNo.should.equal(params.reg_no);
                docs[0].ArtistNames.should.be.instanceof(Array);
                docs[0].ArtistNames.length.should.equal(3);
                docs[0].ArtistNames.should.include.members(artists);
            });
            done();
        });
    });

    // remove x to activate.
    // xit -> it.
    xit("GET /result : Serve result of poll as json", function (done) {
        client.get("/result")
        .expect(200)
        .end(function (err) {
            should.not.exist(err);
            done();
        });
    });

    after("cleanup", function (done) {
        UserData.remove({ regNo: "14BIT0180" }, function (err) {
            should.not.exist(err);
            done();
        });
    });
});

describe("index routes - special cases", function () {

    // remove x to activate.
    // xit -> it.
    xit("POST / : Duplicate Entry", function (done) {
        var params = {
            "reg_no": "14BIT0180",
            "artist_5": "on",
            "artist_2": "on"
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
            //.expect(400)
            .end(function (err2, res2) {
                should.not.exist(err2);
                res2.header.location.should.include("/error");
                done();
            });
        });
    });

    // remove x to activate.
    // xit -> it.
    it("POST / : More than 3 artists selected", function (done) {
        var params = {
            "reg_no": "14BIT0179",
            "artist_9": "on",
            "artist_8": "on",
            "artist_4": "on",
            "artist_2": "on",
            "artist_1": "on"
        };
        client.post("/")
        .type("form")
        .send(params)
        .end(function (err, res) {
            should.not.exist(err);
            res.header.location.should.include("/success");

            UserData.find({ RegNo: params.reg_no }, function (findError, docs) {
                should.not.exist(findError);
                docs.length.should.equal(0);
            });
            done();
        });
    });

    after("cleanup", function (done) {
        var query = { regNo: { $in: ["14BIT0180", "14BIT0179"] } };
        UserData.remove(query, function (err) {
            should.not.exist(err);
            done();
        });
    });
});
