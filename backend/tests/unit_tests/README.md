# Unit Test

## `server.py` Anayltics

Activate virtual environment `venv` and run the Postgres dockerized db. \
We will use `coverage.py` and `unittest`.

Install `coverage.py` 
```
pip install coverage
```

To measure code coverage with `backend/src/server.py` run 
```
coverage run server.py
```

Begin running our unit test in directory `tests/unit_tests`
```
python -m unittest -v 
```

Kill the server process and get a coverage report 
```
coverage report -m 
coverage html
```

Access the visual report with `htmlcov/server.py.html` in your browser. \
You will see colorized options to for `run`, `missing`, and `excluded`. 
