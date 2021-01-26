# Run Unit Tests

Make sure to activate your virtual environment `venv`.

Run all test methods 
```
python -m unittest -v 
```

To measure code coverage, download coverage.py 
```
pip install coverage
```
Then run coverage with 
```
coverage run -m unittest discover 
coverage report -m
```
