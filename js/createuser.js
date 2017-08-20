var http = require('http');
var util = require('util');
var formidable = require('formidable');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

http.createServer(function (req, res) {
	if (req.url == '/createuser') {
	console.log("aa gaya");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      res.end();
    });
}
}).listen(8071);