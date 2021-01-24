import psycopg2

# connect to the db
con = psycopg2.connect(
        host = "localhost",
        database = "pgdb",
        user = "postgres",
        password = "postgres")

# cursor
cur = con.cursor()

cur.execute("INSERT INTO entry (content, user_id) VALUES (%s, %s)", ("Another post!", 1))

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
