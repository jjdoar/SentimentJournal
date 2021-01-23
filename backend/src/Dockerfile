# Dockerfile

FROM mirghaeng/pgsj:1.0

USER root

# install Python 3
RUN apt-get update && apt-get install -y python3 python3-pip
RUN apt-get install libpq-dev

# install postgresql and psycopg2
RUN mkdir -p /home/app
COPY . /home/app
RUN pip3 install --no-cache-dir -r /home/app/requirements.txt

# add 'postgres' admin role
USER postgres

# expose Postgres port
EXPOSE 5432

# bind mount Postgres volumes for persistent data
VOLUME ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# make symbolic link to /tmp/.s.PGSQL.5432
#RUN ln -s /tmp/.s.PGSQL.5432 /var/run/postgresql/.s.PGSQL.5432

# start db.py
CMD ["python3", "home/app/db.py"]
