//This file is for the beagle bone black board.

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'lightcontrol'
});

var b = require('bonescript');
var Gchannel = 'P9_14',Rchannel = 'P9_21', Bchannel = 'P8_13';//define PWM pins
b.pinMode(Rchannel, b.OUTPUT);
b.pinMode(Gchannel, b.OUTPUT);
b.pinMode(Bchannel, b.OUTPUT);
b.digitalWrite('USR0',0);//close usr pins to avoid disturb.
b.digitalWrite('USR1',0);
b.digitalWrite('USR2',0);
b.digitalWrite('USR3',0);
connection.connect();

var lastRed,lastBlue,lastGreen;//record the rgb value of last time.
updateLight = function(updateLight){
	connection.query('SELECT * FROM light_settings WHERE Num=0', function(err, rows) {//select the rgb values.
 	 if (err) throw err;
 	 var redIntensity,greenIntensity,blueIntensity;

	 redIntensity = 1 -   rows[0].red;//Because there are voltage inverter in hardware, need to reverse the pwm value here.
	 greenIntensity = 1 -   rows[0].green;
	 blueIntensity = 1 -   rows[0].blue;

	 console.log("redIntensity: ", redIntensity);
  	 console.log("blueIntensity: ", blueIntensity);
	 console.log("greenIntensity: ", greenIntensity);
	 if((redIntensity != lastRed)||(blueIntensity!=lastBlue)||(greenIntensity!=lastGreen)){
	 	b.analogWrite(Rchannel, redIntensity, 200.0);//update PWM
  		b.analogWrite(Gchannel, greenIntensity, 200.0);
 	 	b.analogWrite(Bchannel, blueIntensity, 200.0);
	 }
	 lastRed = redIntensity;
	 lastGreen = greenIntensity;
	 lastBlue = blueIntensity;

	});
}

timer = setInterval(updateLight,10);//rate 10Hz


