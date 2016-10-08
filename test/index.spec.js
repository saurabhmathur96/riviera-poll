var should = require("chai").should();
var supertest = require("supertest");
var path = require("path");
var app = require(path.join(__dirname, "..", "app"));
var client = supertest(app);


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
        var params = {
            "reg_no": "14BIT0180",
            "artist_5": "on",
            "artist_2": "on",
            "artist_1": "on"
        };
        client.post("/")
        .type("form")
        .send(params)
        .expect(200)
        .end(function (err) {
            should.not.exist(err);
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
        .expect(200)
        .end(function (err1) {
            should.not.exist(err1);
            client.post("/")
            .type("form")
            .send(params)
            .expect(400)
            .end(function (err2) {
                should.not.exist(err2);
                done();
            });
        });
    });

    // remove x to activate.
    // xit -> it.
    xit("POST / : More than 3 artists selected", function (done) {
        var params = {
            "reg_no": "14BIT0180",
            "artist_9": "on",
            "artist_8": "on",
            "artist_4": "on",
            "artist_2": "on",
            "artist_1": "on"
        };
        client.post("/")
        .type("form")
        .send(params)
        .expect(400)
        .end(function (err) {
            should.not.exist(err);
            done();
        });
    });
});
