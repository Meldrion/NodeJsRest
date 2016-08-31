"use strict";
var express = require('express');
var winston = require('winston');
var myFunc = require("./myfunction.js");
var app = express();


/**
 * This gets always called once a client uses the api
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 * This is the REST hello method
 * In case of any error, this will return the json error string
 */
app.get('/hello', function (req, res) {

    try {

        var x = Math.floor(Math.random() * 10);
        if (x == 2 || x == 8) throw "holy cow ! " + myFunc.cube(3);
        res.json({message: "The number is " + x});

    } catch (err) {
        winston.log("error", "There has been the holy cow error");
        res.json({error: err});
    }

});

/**
 * We start our WebService here
 * @type {http.Server}
 */
var server = app.listen(8000, function () {

    winston.add(winston.transports.File, {filename: 'logs/myNiceLog.json'});
    var host = server.address().address;
    var port = server.address().port;
    winston.log("info","Sample Javascript web service http://%s:%s", host, port);

});
