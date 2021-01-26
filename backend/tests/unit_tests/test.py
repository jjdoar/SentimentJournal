import unittest
import requests
import json

class TestAPI(unittest.TestCase):
    def test_get(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17', 'userId': 1}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", params=json.dumps(query))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [{"content":"This is an example post.","date":"2021-01-26","score":0,"userId":1},{"content":"A second post.","date":"2021-01-26","score":0,"userId":1}])

if __name__ == '__main__':
  unittest.main()
