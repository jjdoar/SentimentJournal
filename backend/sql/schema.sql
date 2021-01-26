DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS entry;

CREATE TABLE users(
	id INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(26) NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE entry(
	id INT GENERATED ALWAYS AS IDENTITY,
	date DATE NOT NULL DEFAULT CURRENT_DATE,
	time TIME NOT NULL DEFAULT CURRENT_TIME,
	content VARCHAR(1000) NOT NULL,
	user_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
