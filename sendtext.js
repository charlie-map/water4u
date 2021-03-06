require('dotenv').config({
	path: __dirname + "/.env"
});
const mysql = require('mysql2');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);


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

function sendMail(number, message) {
	client.messages.create({
		from: process.env.TWILIO_PHONE_NUMBER,
		to: number,
		body: message
	}).then((message) => {
		return message
	});
}

function sending() {
	return new Promise((resolve, reject) => {
		connection.query("SELECT * FROM water_client WHERE subscribed=1", (err, clients) => {
			if (err) throw err;
			let hours = (parseInt(new Date().getHours(), 10) + 20) % 24;
			clients.forEach((item, index) => {
				console.log("checking for mail", item);
				// use consist to know if we should send the text at this time
				if (hours % item.consist == 0 && hours >= 7 && hours <= 22) {
					console.log("sending to", item.numbers);
					sendMail("+1" + item.numbers, "Hey " + item.name + ", don't forget to drink water!");
				}
			});
			resolve();
		});
	});
}

sending().then(() => {
	console.log("dun");
	connection.close();
})
