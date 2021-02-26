import json
import psycopg2
import os
import sys
from dotenv import load_dotenv
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime
from google.cloud import language_v1

client = language_v1.LanguageServiceClient()

load_dotenv()
app = Flask(__name__)
cors = CORS(app)

db = "host='0.0.0.0' dbname=%s user=%s password=%s" % (os.getenv('POSTGRES_DB'),
                                                       os.getenv(
                                                           'POSTGRES_USER'),
                                                       os.getenv('POSTGRES_PASSWORD'))
conn = psycopg2.connect(db)
cur = conn.cursor()


@app.route("/v0/journal_entries", methods=['GET', 'PUT', 'DELETE'])
def journal_entries():

    request_body = request.get_json()
    print(request_body)
    #startDate = request.args.get("startDate")
    #endDate = request.args.get("endDate")
    userId = request.args.get("userId")
    #print(startDate, endDate, userId)

    if request.method == 'GET':

        if not any([startDate, endDate, userId]):
            return make_response(jsonify({
                "message": "Invalid request",
                "error": "Invalid request body"
            }), 400)

        query = "".join([
            "SELECT * FROM entry WHERE user_id = '",
            userId,
            "' AND date >= DATE '",
            startDate,
            "' AND date <= DATE '",
            endDate,
            "';"
        ])

        cur.execute(query)
        entry_tuples = cur.fetchall()

        journal_entries = []

        for entry_tuple in entry_tuples:
            journal_entry = {}
            journal_entry["date"] = str(entry_tuple[1])
            journal_entry["time"] = str(entry_tuple[2])
            journal_entry["content"] = entry_tuple[3]
            journal_entry["userId"] = str(entry_tuple[4])
            journal_entry["score"] = entry_tuple[5]
            journal_entries.append(journal_entry)

        return make_response(jsonify(journal_entries), 200)

    if request.method == 'PUT':

        if not request_body or not (request_body.keys() == {"userId"}
            or request_body.keys() == {"date", "userId", "content"}):
            return make_response(jsonify({
                "message": "Invalid request",
                "error": "Invalid request body"
            }), 400)

        if request_body.keys() == {"userId"}:
            userId = request_body["userId"]
            query = "INSERT INTO users (id) VALUES ('{0}')"
            cur.execute(query.format(userId))
            conn.commit()
            return make_response(jsonify({ "message": "Created" }), 201)

        if request_body.keys() == {"date", "userId", "content"}:
            date = request_body["date"]
            userId = request_body["userId"]
            content = request_body["content"]

            # Detects the sentiment of the text
            document = language_v1.Document(
                content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
            sentiment = client.analyze_sentiment(
                request={'document': document}).document_sentiment
            score = round(sentiment.score, 3)

            query = "".join([
                "SELECT * FROM entry WHERE user_id = '",
                userId,
                "' AND date = DATE '",
                date,
                "';"
            ])

            cur.execute(query)
            entry_tuple = cur.fetchall()

            # Check if entry exists yet
            if not entry_tuple:
                query = "INSERT INTO entry (user_id, date, content, score) VALUES ('{0}', '{1}', '{2}', {3})"
                cur.execute(query.format(userId, date, content, score))
                conn.commit()

                return make_response(jsonify({
                    "message": "Created"
                }), 201)

            query = "UPDATE entry SET content = '{0}', score = {1} WHERE user_id = '{2}' AND date = '{3}'"
            cur.execute(query.format(content, score, userId, date))
            conn.commit()

            return make_response(jsonify({
                "message": "Updated"
            }), 200)


    if request.method == 'DELETE':
        if not any([startDate, endDate, userId]):
            return make_response(jsonify({
                "message": "Invalid request",
                "error": "Invalid request body"
            }), 400)

        query = "".join([
            "DELETE FROM entry WHERE user_id = '",
            userId,
            "' AND date >= DATE '",
            startDate,
            "' AND date <= DATE '",
            endDate,
            "';"
        ])

        cur.execute(query)
        conn.commit()

        return make_response(jsonify({
            "message": "Deleted"
        }), 200)

if __name__ == '__main__':

    app.run(host='0.0.0.0', port=8081)
