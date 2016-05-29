var PORT = 3000;//
var app = require('express')();
var http = require('http');
var url =require('url');
var fs = require('fs');
var mine = require('./js/FileTypes').types;
var path = require('path');
var WebRoot = '.';

var server = http.createServer(function (request, response){
    var pathname = url.parse(request.url).pathname;
    pathname = (pathname == '/')?'/SimpleLight.html':pathname;
    var realPath = path.join(WebRoot, pathname);
    //var realPath = pathname;
    console.log(realPath);
    var ext = path.extname(realPath);
    console.log(ext);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });	
});

server.listen(PORT);//listen to the port
console.log('Server runing at port: ' + PORT + '.');

var io = require('socket.io')(server);
var mysql = require('mysql');
var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '123456',
        database : 'lightcontrol'
});//connect to mysql database

connection.connect();

io.on('connection',function(socket){//socket.io connection event
	console.log('a user connected');

        sql = 'select * from light_settings where num = 0';
        connection.query(sql,function(err,rows){
            msg = {'r':rows[0].red,'g':rows[0].green,'b':rows[0].blue};
    	console.log(msg);
            socket.emit('init',msg);//initialize the palette
        });

    socket.on('disconnect',function(socket){//connection shut down event
		console.log('a user disconnected');
	});
	
	socket.on('light update', function(msg){//update RGB value in mysql
		//console.log("light update: ",msg);
		if(msg.Red<=1||msg.Red>=0||msg.Green<=1||msg.Green>=0||msg.Blue<=1||msg.Blue>=0){//check the range of the rgb value(0 ~ 1), the value is normalized.
			sql = 'update light_settings set Red = '+ msg.Red + ', Green = ' + msg.Green + ', Blue = ' + msg.Blue + ' where num = 0';	
			connection.query(sql, function(err){//update mysql database
				if(err) throw err;
			});
		}			
	});
});

