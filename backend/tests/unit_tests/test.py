import unittest
import requests
import json

class TestAPI(unittest.TestCase):
    def test_get(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17', 'userId': 1}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", params=json.dumps(query))
        self.assertEqual(response.status_code, requests.codes.ok)
        #self.assertEqual(response.json(),
        #        [{"content":"This is an example post.","date":"2021-01-26","score":0,"userId":1},
        #            {"content":"A second post.","date":"2021-01-26","score":0,"userId":1}])

    def test_put(self):
        data = {"content":"I am creating a post.","date":"2021-01-04","userId":5}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", params=json.dumps(data))
        self.assertEqual(response.status_code, requests.codes.created)

    def test_post(self):
        data = {"content":"I am updating my post.","date":"2021-01-05","userId":5}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", params=json.dumps(data))
        self.assertEqual(response.status_code, requests.codes.no_content)

if __name__ == '__main__':
  unittest.main()
