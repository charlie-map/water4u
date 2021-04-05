DROP DATABASE water_db;
CREATE DATABASE water_db;
USE water_db;

CREATE TABLE water_client (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	numbers VARCHAR(255) NOT NULL,
	subscribed TINYINT NOT NULL,
	consist INT NOT NULL,
	PRIMARY KEY (id),
	UNIQUE INDEX `unique_client` (`numbers`)
);

CREATE USER 'your_user_here'@'localhost' IDENTIFIED BY 'your_password_here';
GRANT SELECT, UPDATE, DELETE ON 'water_db'.'water_client' TO 'your_user_here'@'localhost';
FLUSH PRIVILEGES;