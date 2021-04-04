require('dotenv').config({
	path: __dirname + "/.env"
});
const mysql = require('mysql2');
const {
	sendMail
} = require("./server.js");

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

function sending() {
	return new Promise((resolve, reject) => {
		connection.query("SELECT * FROM water_client WHERE subscribed=1", (err, clients) => {
			if (err) throw err;
			clients.forEach((item, index) => {
				sendMail("+1" + item.number, "Hey " + item.name + ", don't forget to drink water!");
			});
			resolve();
		});
	});
}

sending().then(() => {
	console.log("dun");
	connection.close();
})