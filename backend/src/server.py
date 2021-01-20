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
                    "content": "foo bar"
                    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
            ]

            for journal_entry in journal_entries:
                journal_entry["score"] = 0

            #TODO Implement Sentiment analysis

            return make_response({journal_entries}, 200)



if __name__ == '__main__':
    
    app.run(host='0.0.0.0', port=8081)
