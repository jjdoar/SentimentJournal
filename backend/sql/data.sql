INSERT INTO users(name) VALUES ('Jasmine');
INSERT INTO entry(content) VALUES ('This is an example post.');
INSERT INTO entry (user_id, date, content, score) VALUES (1, 2021-02-21, "i had a bad day", .35)
INSERT INTO entry (user_id, date, content, score) VALUES (1, 2021-02-19, "i had a good day", .85)
UPDATE entry SET user_id = 1 WHERE id = 1;