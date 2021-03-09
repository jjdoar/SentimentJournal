# Team

Daniel Escoto

Jacob Doar

Miranda Eng

Dominik Schmidt

James Garrett

Parker Soto

# SentimentJournal

A journal to track a user's mood over time.
Journal Entries are scored using the Google Sentiment API.
Mood scores are then displayed on the calendar using colors.

## Backend Setup

Install Docker
Move to the backend folder

Run the postgreSQL image

```
docker-compose up -d
```

Setup the environment

```
python3 -m venv venv
```

Activate the environment(Windows)

```
venv/Scripts/activate
```

Activate the environment(Linux/MacOS)

```
. venv/bin/activate
```

Install dependencies

```
pip install -r requirement.txt
```

Set up Google Cloud credentials (Windows)

```
set GOOGLE_APPLICATION_CREDENTIALS=<path to api key>
```

Setup Google cloud credentials(Linux/MacOS)

```
export GOOGLE_APPLICATION_CREDENTIALS=<path to api key>
```

Start the server

```
python3 src/server.py
```

## Frontend Setup

Move to the frontend folder

Install Node and npm

```
npm install
```

Start the app

```
npm start
```

## Notes

For running locally change the IP address in frontend http requests to localhost
