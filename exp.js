var express=require('express');
var app = express();
var mysql = require('mysql');
var sql = '';
var nodemailer = require('nodemailer');
var http = require('http');
var url = require('url') ;
var util = require('util');
var formidable = require('formidable');
var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "interviewportal"
		});

app.set('view engine','ejs');

app.get('/',function(req,res){
		//res.writeHead(200,{'Content-Type':'text/html'});
		var structure = '';
		sql = "SELECT * FROM `users`";
		con.connect(function(err) {
		//if (err) throw err;
		con.query(sql, function (err, users) {
			//if (err) throw err;
			res.render('admin_ejs',{userdata:users});
		});
	});
	//res.end();	
});
app.post('/createuser',function(req,res){
		var form = new formidable.IncomingForm();
		var token_val = Date.now();
    form.parse(req, function (err, fields, files) {
		//res.write('File uploaded');
		sql = "INSERT INTO `users`(`id`, `email`,`token`) VALUES (NULL, '"+fields.email_id+"','"+token_val+"')";
		/* res.end(util.inspect({
			fields: fields
		})); */
		con.connect(function(err) {
			//if (err) throw err;
			con.query(sql, function (err, result) {
				//if (err) throw err;
				//console.log("value inserted");
				usersData = result;
			});
			
		var hostname = req.headers.host; 
		var full_token_path = 'http://' + hostname +'/portal/'+token_val ;
		mail(fields.email_id,full_token_path);	
			
		});
		res.redirect('/');
		res.end('File uploaded');
    });
});

app.get('/score/[0-9]*',function(req,res){
		var pathname = url.parse(req.url).pathname;
		var score = pathname.substr(pathname.lastIndexOf('/') + 1);
		res.render('score',{scoredata:score});
		res.end();
});

app.get('/portal/[0-9]*',function(req,res){
		var pathname = url.parse(req.url).pathname;
		var token = pathname.substr(pathname.lastIndexOf('/') + 1);
		usersql = "SELECT * FROM `users` where token='"+token+"' AND status=1";
		con.connect(function(err) {
			con.query(usersql, function (err, result) {
				if (result[0].status>0) {
					res.redirect('/score/'+result[0].score);
					res.end();
				} else{
			
		sql = "SELECT * FROM `questions` ORDER BY RAND() LIMIT 2";
		con.connect(function(err) {
			con.query(sql, function (err, questions) {
				res.render('portal',{questionsdata:questions, token: token});
				res.end();
			});
		});
		}
		});
		});
		
});

app.post('/portal_submit/[0-9]*',function(req,res){
		quessql = "SELECT * FROM `questions`";
		con.connect(function(err) {
			con.query(quessql, function (err, questions) {
				var form = new formidable.IncomingForm();
				form.parse(req, function (err, fields, files) {
					/* var fields = res.end(util.inspect({
						fields: fields;
					})); */
					var score = 0;
					for(var i=0;i<questions.length;i++){
						var question = questions[i];
						var id = question.qid;
						if(fields[id]) {
							if (fields[id] === question.answer) {
								score += 1;
							}
						}
					}
					var pathname = url.parse(req.url).pathname;
					var token = pathname.substr(pathname.lastIndexOf('/') + 1);
					sql = "UPDATE `users` SET `score`="+score+", `status`=1 WHERE token='"+token+"'";
					con.connect(function(err) {
						con.query(sql, function (err, result) {
							res.redirect('/score/'+score);
						});			
					});
				});
			});
		});
});

function mail(reciever_mailid,token_val){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akash.123029@gmail.com',
    pass: '8509101579'
  }
});

var mailOptions = {
  from: 'akash.123029@gmail.com',
  to: reciever_mailid,
  subject: 'Sending Email using Node.js',
  text: 'That was easy! \n ' +token_val+''
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
app.listen(8070);