# DB

## Getting Started

Install Docker and call run the PostgreSQL image

```
docker-compose up -d
```

# API

## Getting Started

Create a virtual enviornment

```
python3 -m venv venv
```

Activate the venv (Linux)

```
. venv/bin/activate
```

Activate the venv (Windows)

```
venv\Scripts\activate
```

Install the dependencies

```
pip install -r requirements.txt
```

Set up Google Cloud credentials (Linux)

```
export GOOGLE_APPLICATION_CREDENTIALS=<path to api key>
```

Set up Google Cloud credentials (Windows)

```
set GOOGLE_APPLICATION_CREDENTIALS=<path to api key>
```

Start the flask server

```
python src/server.py
```

## Notes

For running locally change the IP address in frontend requests to localhost
