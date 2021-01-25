import json
import psycopg2
from flask import Flask, request,  jsonify, make_response

app = Flask(__name__)

#try:
#    conn = psycopg2.connect("dbname=test user=postgres")
#    cur = conn.cursor()
#except:
#    pass

@app.route("/v0/journal_entries", methods=['GET', 'PUT', 'POST'])
def journal_entries():
    request_body = request.get_json()

    if request.method == 'GET':
        if not request_body.keys() == {"startDate", "endDate", "userId"}:
            make_response({
                "message": "Invalid request",
                "error": "Invalid request body"
            }, 400)
        else:
            start_date = request_body["startDate"]
            end_date = request_body["endDate"]
            user_id = request_body["userId"]

            query = "".join(
                "SELECT * FROM entry WHERE userId = ",
                user_id,
                "AND date >= ",
                start_date,
                "AND date <=",
                end_date,
                ";"
            )

            # cur.execute(query)
            # journal_entries = cur.fetchall()

            journal_entries = [
                {
                    "date": "2021-01-20",
                    "content": "foo bar",
                    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            ]

            for journal_entry in journal_entries:
                journal_entry["score"] = 0

            #TODO Implement Sentiment analysis

            return make_response({journal_entries}, 200)
    
    elif request.method == 'PUT':
        if not request_body.keys() == {"date", "userId", "content"}:
            make_response({
                "message": "Invalid request",
                "error": "Invalid request body"
            }, 400)
        else:
            date = request_body["date"]
            user_id = request_body["userId"]
            content = request_body['content']

            query = "INSERT INTO entry (userId, date, content) VALUES (%s, %s, %s)"
            values = (user_id, date, content) 

            # cur.execute(query, values)
            
            return make_response({
                "message": "Created"
            }, 201)

    else:
        if not request_body.keys() == {"date", "userId", "content"}:
            make_response({
                "message": "Invalid request",
                "error": "Invalid request body"
            }, 400)
        else:
            date = request_body["date"]
            user_id = request_body["userId"]
            content = request_body["content"]

            query = "UPDATE entry SET content = %s WHERE userId = %s AND date = %s"
            values = (content, user_id, date)
            
            # cur.execute(query, values)
            # conn.commit()

            return make_response({
                "message": "Updated"
            }, 204)

if __name__ == '__main__':
    
    app.run(host='0.0.0.0', port=8081)
