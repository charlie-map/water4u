require('dotenv').config({
	path: __dirname + "/.env"
});
const express = require('express');
const mysql = require('mysql2');
const bodyParse = require('body-parser');
const app = express();

//console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);

const connection = mysql.createConnection({
	host: process.env.HOST,
	database: process.env.DATABASE,
	user: process.env.DATA_USER,
	password: process.env.PASSWORD,
	insecureAuth: false
});

connection.connect((err) => {
	if (err) throw err;
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParse.urlencoded({
	extended: true
}));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.post("/signup-user", (req, res) => {
	console.log(req.body);
	//fix the phone number
	let answers = [];
	let number = req.body.phone.replace(/[^0-9]/g, "");
	
	if (number.length < 10) return res.end("Not enough digits");
	if (number.length > 10) return res.end("Too many digits");
	// connection.query("INSERT INTO water_client (name, country_code, number, subscribed, consist) VALUES (?, ?, ?, ?, ?)", 
	// 	[req.body.name, code, number, 1, parseInt(req.body.per_day, 10) + 1], (err) => {
	// 	if (err) console.log(err);
	// 	res.redirect("/");
	// });
});

app.post("/drop-user", (req, res) => {
	let number = req.body.phone.replace(/[^0-9]/g, "");
	if (number.length < 10) return res.end("Not enough digits");
	if (number.length > 10) return res.end("Too many digits");
	connection.query("DELETE FROM water_client WHERE numbers=?", number, (err) => {
		if (err) console.error(err);
		res.redirect("/");
	});
});

app.listen(3000, () => {
	console.log("server go vroom");
});
