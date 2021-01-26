# Run Unit Tests

Make sure to activate your virtual environment `venv`.

Run all test methods 
```
python -m unittest -v 
```

Run individal test methods
```
python -m unittest test.TestAPI.test_get -v 
python -m unittest test.TestAPI.test_put -v 
python -m unittest test.TestAPI.test_post -v
```

To measure code coverage, download coverage.py:
```
pip install coverage
```
Then run coverage with:
```
coverage run -m unittest discover
```
Or, to have annotated HTML listing run:
```
coverage report -m
```
and open htmlcov/index.html in browser
