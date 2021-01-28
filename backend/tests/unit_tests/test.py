import unittest
import requests
import json

class TestAPI(unittest.TestCase):

    # TEST: simple get
    def test_get(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17', 'userId': 1}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.ok)

    # TEST: empty query
    def test_get_empty(self):
        query = {}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: no userId key-value specified
    def test_get_no_id_key_value(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17'}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: userId value does not exist in db
    def test_get_id_DNE(self):
        query = {'startDate': '2020-11-17', 'endDate': '2021-11-17', 'userId': 666}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: key name does not exist in db, 'endDates'
    def test_get_key_DNE(self):
        query = {'startDate': '2020-11-17', 'endDates': '2021-11-17', 'userId': 1}
        response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: simple put -> TEST: simple post -> TEST: simple get -> check if data exists in db
    def test_put(self):
        data = {"content": "Created PUT.", "date": "2021-01-27", "userId": 1}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.created)

    # TEST: get put data
    #def test_get_put_data(self):
    #    query = {'startDate': '2021-01-27', 'endDate': '2021-01-27', 'userId': 1}
    #    response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
    #    self.assertEqual(response.json(),
    #            {"content": "Created PUT.", "date": "2021-01-27", "score": 0, "userId": 1})

    # TEST: empty data
    def test_put_empty(self):
        data = {}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: no userId key-value
    def test_put_no_id_key_value(self):
        data = {"content": "I am creating a post.", "date": "2021-01-04"}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: userId value does not exist in db
    def test_put_id_DNE(self):
        data = {"content": "I am creating a post.", "date": "2021-01-04", "userId": 2}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.internal_server_error)

    # TEST: key name does not exist in db, 'dates'
    def test_put_key_DNE(self):
        data = {"content": "I am creating a post.", "dates": "2021-01-04", "userId": 1}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: simple post
    def test_post(self):
        data = {"content": "Created POST.", "date": "2021-01-27", "userId": 1}
        response = requests.post(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.no_content)

    # TEST: empty data
    def test_post_empty(self):
        data = {}
        response = requests.put(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: no userId key-value
    def test_post_no_id_key_value(self):
        data = {"content": "I am creating a post.", "date": "2021-01-04"}
        response = requests.post(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.bad_request)

    # TEST: userId value does not exist in db
    def test_post_id_DNE(self):
        data = {"content": "I am creating a post.", "date": "2021-01-04", "userId": 666}
        response = requests.post(url="http://0.0.0.0:8081/v0/journal_entries", json=data)
        self.assertEqual(response.status_code, requests.codes.no_content)

    # TEST: get post data
    #def test_get_post_data(self):
    #    query = {'startDate': '2021-01-27', 'endDate': '2021-01-27', 'userId': 1}
    #    response = requests.get(url="http://0.0.0.0:8081/v0/journal_entries", json=query)
    #    self.assertEqual(response.json(),
    #            {"content": "Created POST.", "date": "2021-01-27", "score": 0, "userId": 1})

if __name__ == '__main__':
  unittest.main()
