import json
import psycopg2
import os
import sys
from dotenv import load_dotenv
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime
from google.cloud import language_v1
import re

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

def parsemarkdown(md):
    # single quote fix
    md = re.sub('\'', '\'\'', md)

    # remove all list numbers (1. 2. etc)
    md = re.sub(r"\d+\.", '', md)

    # remove code blocks and inline
    md = re.sub(r"\s{3,}.*\n", '', md)
    md = re.sub(r"`.*`", '', md)

    # remove images
    md = re.sub(r"!\[.*\]\(.*\)", '', md)
    md = re.sub(r"\[!\[.*\]\(.*\)\]\(.*\)", '', md)

    # remove links, regular and formatted
    md = re.sub(r"<.*>", '', md)
    md = re.sub(r"\[.*\]\(.*\)", '', md)

    # remove special characters
    md = re.sub(r"#|=|\*|-|>|_", '', md)

    # remove extra spaces
    md = re.sub(' +', ' ', md)
    # remove new lines
    md = re.sub('\n', '', md)

    return md


@app.route("/v0/journal_entries", methods=['GET', 'PUT', 'DELETE'])
def journal_entries():

    request_body = request.get_json()
    startDate = request.args.get("startDate")
    endDate = request.args.get("endDate")
    userId = request.args.get("userId")

    if request.method == 'GET':
        # Check if logging in
        if userId and not (startDate and endDate):
            query = "SELECT * FROM users WHERE id = '{0}'"
            cur.execute(query.format(userId))
            users = cur.fetchall()
            for user in users:
                name = str(user[1])
            return make_response(jsonify(users), 200)

        if not any([startDate, endDate, userId]):
            return make_response(jsonify({
                "message": "Invalid request",
                "error": "Invalid request body"
            }), 400)

        query = "SELECT * FROM entry WHERE user_id = '{0}' AND date >= DATE '{1}' AND date <= DATE '{2}'"
        cur.execute(query.format(userId, startDate, endDate))
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

        # Check if wrong input
        if not request_body or not (request_body.keys() == {"userId", "name"}
            or request_body.keys() == {"date", "userId", "content"}):
            return make_response(jsonify({
                "message": "Invalid request",
                "error": "Invalid request body"
            }), 400)

        # Check if signing up
        if request_body.keys() == {"userId", "name"}:
            userId = request_body["userId"]
            name = request_body["name"]
            query = "INSERT INTO users (id, name) VALUES ('{0}', '{1}')"
            cur.execute(query.format(userId, name))
            conn.commit()
            return make_response(jsonify({ "message": "Created" }), 201)

        # Check if putting in new entry
        if request_body.keys() == {"date", "userId", "content"}:
            date = request_body["date"]
            userId = request_body["userId"]
            content = request_body["content"]

            # Detects the sentiment of the text
            document = language_v1.Document(
                content=parsemarkdown(content), type_=language_v1.Document.Type.PLAIN_TEXT)
            sentiment = client.analyze_sentiment(
                request={'document': document}).document_sentiment
            score = round(sentiment.score, 3)

            query = "".join([
                "SELECT * FROM entry WHERE user_id = '",
                userId,
                "' AND date = DATE '",
                date,
                "'"
            ])

            cur.execute(query.format(userId, date))
            entry_tuple = cur.fetchall()

            # Check if entry exists yet
            if not entry_tuple:
                query = f"INSERT INTO entry (user_id, date, content, score) VALUES ('{userId}', '{date}', '{content}', {score})"
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
