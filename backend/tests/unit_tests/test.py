import unittest
import requests
import json

class TestAPI(unittest.TestCase):

    # TEST: simple get
    def test_get(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17', 'userId': 1}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.ok)

    # TEST: data from get
    def test_get_data(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17', 'userId': 1}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.json(),
                [{"content":"This is an example post.","date":"2021-01-26","score":0,"userId":1},
                    {"content":"A second post.","date":"2021-01-26","score":0,"userId":1}])
    
    # TEST: empty query
    def test_get_empty(self):
        query = {}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: no userId
    def test_get_wrong_key(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17'}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: userId does not exist in db
    def test_get_id_DNE(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17', 'userId': 202}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: simple put
    def test_put(self):
        data = {"content": "I am creating a post.", "date": "2021-01-04", "userId": 202}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.created)

    # TEST: simple post
    def test_post(self):
        data = {"content":"I am updating my post.","date":"2021-01-05","userId": 202}
        response = requests.post(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.no_content)

if __name__ == '__main__':
  unittest.main()
