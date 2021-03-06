CREATE OR REPLACE FUNCTION set_sample_data()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
    AS
$$
BEGIN
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-02-22', 'My day was okay today. I woke up, ate breakfast, and then studied for my quiz. When the quiz came along, the wifi went out halfway thru, I hate zoom classes because I can''t focus in them. I ended up submitting my quiz, and I think I did okay, but I guess I’ll have to wait and see. I finished up my day by watching a movie that I didn''t really care about. Maybe tomorrow will be better.', -0.9);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-02-23', 'Nothing significant happened today. I went on a walk to the beach, saw some cute dogs on my way there. Came back and did some reading. Right now I''m reading Sapiens, and it feels like it’s just dragging on; I might quit the book soon and try and find another one. Other than that, nothing much to say. I''m still waiting for responses for my applications that I sent a few days ago. In the end, today has been slow.', -0.8);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-02-24', 'Today was a stressful day. When I went to go get the mail this morning, the dog ran out of the house. I spent half the day looking for him. Thank god I didn''t have work today. I''m so tired and this didn''t help. I hope tomorrow will be better...', -0.6);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-02-25', 'I went to go get brunch with some people from work today, and we ended up going to this new place that opened near the pier. I ordered a really classic breakfast with eggs and bacon and toast. It was pretty good though they burnt my eggs a little. I want to go back to that place again soon!', -0.4);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-02-27', 'The bookstore I always visit on my way home from work closed today. That makes me so sad. It was a nice place to get coffee and they always let me read for as long as I liked. I have to find another place now, but every other place seems so far away. I have too much on my mind, I''ll think about it tomorrow.', -0.2);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-02-28', 'Dear eggs. I love you so much. Like you taste really good. The combination of salt and pepper so good that I smile everyday thinking about how I could marry you. You are the glue to all ingredients. The flavor to my bland life.', -0.1);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-03-01', 'Dear my bike, Jasmine. I love you to death. ACTUALLY I AM VERYYY disappointed with you. Whenever I give you a tune up and wash, I cry at how ugly you look. Jk, I love you to death :)', 0.2);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-03-02', 'Today I gave my presentation for class. I''ve been super stressed about this because I kept forgetting what I was going to say while I was practicing yesterday. But, it turned out super good! I nailed my part and one of my partners messed up a little bit, but it all turned out fine.', 0.4);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-03-03', 'I have never had a worse day in my life. I missed the bus to school, forgot my notebooks on my desk, and failed a test in English. I wanna diiieeeeeeee. At least mom made my favourite dumplings for dinner though. Those dumplings are the only thing keeping me from going insane right now.', 0.6);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-03-04', 'My sleep schedule has been pretty crappy lately. I''ve had trouble sleeping at night, and have been falling asleep during the day. People have suggested that I start drinking teas at night, but I hate tea! Melatonin gets me to sleep, but doesn''t keep me there, unfortunately. I think it might be stressing me out a bit, which doesn''t help at all!', 0.8);
    INSERT INTO entry (user_id, date, content, score) VALUES (NEW.id, '2021-03-05', 'Today is my birthday! It was pretty chill, didn''t do a whole lot, but that''s not a problem. I''ve never been one for huge parties. I wonder when the quarter-life crisis will finally kick in. I''m at a turning point in my life where I''m ready to be more independent now. I''m going to be moving soon which is exciting. But ugh, she who will not be named texted me today, wishing me a happy birthday. I should really delete her number.', 0.9);
    RETURN NEW;
END;
$$;

CREATE TRIGGER sample_data
    AFTER INSERT ON users
    FOR EACH ROW EXECUTE PROCEDURE set_sample_data();

INSERT INTO users (name, id) VALUES ('Jasmine', 'a0Q43nBxEWWlBytXVnveMvZHHDZ2');