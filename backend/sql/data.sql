INSERT INTO users(name) VALUES ('Jasmine');
INSERT INTO entry(content) VALUES ('This is an example post.');
INSERT INTO entry(content) VALUES ('A second post.');
UPDATE entry SET user_id = 1 WHERE id = 1;
UPDATE entry SET user_id = 1 WHERE id = 2;
