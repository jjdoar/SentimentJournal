import unittest
import requests
import json

class TestAPI(unittest.TestCase):
    def test_get(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17', 'userId': 1}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", params=json.dumps(query))
        self.assertEqual(response.status_code, 200, response.json())
        #self.assertEqual(response.json(), {'key': 'value'})

if __name__ == '__main__':
  unittest.main()
