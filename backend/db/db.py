# FILENAME: db.py
# DESCRIPTION: For testing postgres-container database integration with psycopg2.

import psycopg2

# connect to the db
con = psycopg2.connect(
        host = "172.19.0.1",
        database = "pgdb",
        user = "postgres",
        password = "postgres")

# cursor
cur = con.cursor()

# SQL manipulation
#cur.execute("INSERT INTO users(name) VALUES ('{0}')".format("Caleb"))
#cur.execute("INSERT INTO entry(content) VALUES ('{0}')".format("Another post!"))
#cur.execute("UPDATE entry SET user_id = {0} WHERE id = {1}".format(7, 7))
#cur.execute("DELETE FROM users WHERE name = '{0}'".format("Caleb"))

# execute query
cur.execute("SELECT date, time, content FROM entry")

rows = cur.fetchall()

for r in rows:
    print(f"{r[0]} {r[1]} {r[2]}")

# commit the transaction
con.commit()

# close the cursor
cur.close()

# close the connection
con.close()
