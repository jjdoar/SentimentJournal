# SentimentJournal  
A mood tracking journal  

## Setup Environment  
```
cd SentimentJournal  
python3 -m venv venv  
```
##### Windows  
```
venv/bin/activate  
```
##### Linux, MacOS  
```
source venv/bin/activate  
```

## Spin up db with docker  
```
cd backend  
docker-compose up -d  
```

## Install Dependencies 
```
cd src  
pip install -r backend/requirements.txt  
```

## Setup Google Cloud Credentials  
##### Linux, MacOS
```
export GOOGLE_APPLICATION_CREDENTIALS=path/to/apikey.json  
```

## Run server
```
python backend/server.py  
```