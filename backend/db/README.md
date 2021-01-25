# README.md

Download Docker on your machine. 
Build your postgres db container using the command:
```
docker-compose --env-file env up -d
``` 

We check to see that the container is running: 
```
docker ps -a
```

If not using the database, enter: 
```
docker-compose --env-file env down
```

Clean up docker. Either by the Docker Desktop Client or manually:
```
docker stop <container-id> 
docker system prune 
docker rmi <image-id> 
docker images prune 
docker volume rm $(docker volume ls -qf dangling=true) 
docker network prune 
``` 

For easy access to the db, use pgadmin: 
```
docker pull dpage/pgadmin4 
docker run -p 8080:80 -d -e PGADMIN_DEFAULT_EMAIL="youremail" -e PGADMIN_DEFAULT_PASSWORD="yourpassword" --name pgadmin dpage/pgadmin4 
```
Go to `localhost:8080` and enter your login info. 
Before we add the postgres server into pgadmin, go to terminal and enter: 
```
docker inspect db
```
Then search for Gateway in Networks in NetworkSettings. 
Go back to pgadmin and enter this IP-Address in when creating a new server. 
Also, vim into db.py and put this IP-Address into host. 

Another way to access the database is using Window's SQL Shell (psql). 
In other machines, you can enter: 
```
docker exec -it db bash 
```
And to access psql, enter: 
```
psql -U postgres -d pgdb
```
