# Run Unit Tests

Activate your virtual environment `venv` and run the Postgres containerized database image. \
We will use coverage.py and unittest.

Install `coverage.py` 
```
pip install coverage
```

To measure code coverage with `backend/src/server.py` run 
```
coverage run server.py
```

Begin running our unittest in directory `tests/unit_tests`
```
python -m unittest -v 
```

`CTRL+C` the server process and get a coverage report 
```
coverage run -m unittest discover 
coverage report -m 
coverage html
```

Access a visual report with `htmlcov/server.py.html` in your browser. \
You will see colorized options to for `run`, `missing`, and `excluded`. 
