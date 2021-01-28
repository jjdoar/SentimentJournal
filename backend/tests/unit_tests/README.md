# Run Unit Tests

Make sure to activate your virtual environment `venv` have the postgres container running. 
It is good practice to do coverage and unittests so we use coverage.py and the unittest framework. 

First download `coverage.py` 
```
pip install coverage
```

To big measuring code coverage with `backend/src/server.py` run 
```
coverage run server.py
```

Start running our unittest with `tests/unit_tests/test.py`
```
python -m unittest -v 
```

Stop the server and get a coverage report 
```
coverage run -m unittest discover 
coverage report -m 
coverage html
```

Access a visual report on `htmlcov/server.py.html` in your browser. 
You will see color options to for `run`, `missing`, and `excluded`. 
