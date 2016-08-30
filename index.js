"use strict";
var express = require('express');
var app = express();
var myFunc = require("./myfunction.js")

app.get('/hello',function(req,res) {

	try {
	    var x = 2;// / 0;
	    throw "holy cow ! " + myFunc.cube(3);

	    res.json({message:"Hello World",val:x});
	} catch(err) {
	    res.json({error:err});
	}
});

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

});
