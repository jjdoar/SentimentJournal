import json
import psycopg2
import os
import sys
from dotenv import load_dotenv
from flask import Flask, request, jsonify, make_response
from datetime import datetime

load_dotenv()
app = Flask(__name__)

db = "dbname=%s user=%s password=%s" % (os.getenv('POSTGRES_DB'),
                                        os.getenv('POSTGRES_USER'),
                                        os.getenv('POSTGRES_PASSWORD'))
conn = psycopg2.connect(db)
cur = conn.cursor()

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

            query = "".join([
                "SELECT * FROM entry WHERE user_id = ",
                str(user_id),
                " AND date >= DATE '",
                start_date,
                "' AND date <= DATE '",
                end_date,
                "';"
            ])

            cur.execute(query)
            entry_tuples = cur.fetchall()
            journal_entries = []

            for entry_tuple in entry_tuples:
                journal_entry = {}
                journal_entry["date"] = str(entry_tuple[1])
                journal_entry["content"] = entry_tuple[3]
                journal_entry["userId"] = entry_tuple[4]
                journal_entry["score"] = 0

                journal_entries.append(journal_entry)

            #TODO Implement Sentiment analysis

            return make_response(jsonify(journal_entries), 200)
    
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
