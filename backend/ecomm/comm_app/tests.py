from rest_framework import status
from rest_framework.test import APITestCase
import requests


class Register(APITestCase):

    def test_register_success(self):

        data = {"username": "testuser",
                "email": "testuser@localhost",
                "password": "testpassword"}

        response = self.client.post("/apis/register", data=data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_regiter_fail(self):

        data = {"email": "testuser@localhost",
                "password": "testpassword"}

        response = self.client.post("/apis/register", data=data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class Login(APITestCase):

    def setUp(self):

        data = {"username": "testuser",
                "email": "testuser@localhost",
                "password": "testpassword"}

        self.client.post("/apis/register", data=data)

    def test_login(self):

        data = {"email": "testuser@localhost",
                "password": "testpassword"}

        response = self.client.post("/apis/login", data=data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_invalid_pass(self):

        data = {"email": "testuser@localhost",
                "password": "randompassword"}

        response = self.client.post("/apis/login", data=data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_invalid_email(self):

        data = {"email": "random@localhost",
                "password": "testpassword"}

        response = self.client.post("/apis/login", data=data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_data(self):

        data = {"EMAIL": "testuser@localhost",
                "PASSWORD": "testpassword"}

        response = self.client.post("/apis/login", data=data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class Permsissions(APITestCase):

    def setUp(self):

        data = {"username": "testuser",
                "email": "testuser@localhost",
                "password": "testpassword"}

        self.client.post("/apis/register", data=data)

        data = {"email": "testuser@localhost",
                "password": "testpassword"}

        response = self.client.post("/apis/login", data=data)

        self.access_token = response.data['access_token']

    def test_jwt_token(self):

        params = {
            "token": str(self.access_token)
        }
        res = self.client.post("/apis/verify/token", data=params)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_remove_unauth(self):
        
        data = {"email": "testuser@localhost",
                "password": "testpassword"}

        response = self.client.delete(
            "/apis/flush", content_type="application/json", data=data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



class TestAuth(APITestCase):
    
    def setUp(self):
        
        data = {"username": "testuser",
                "email": "testuser@localhost",
                "password": "testpassword"}

        requests.post("http://localhost:8000/apis/register", data=data)

        self.res = requests.post("http://localhost:8000/apis/login", data=data)

    
    def test_auth_flush(self):

        access_token = self.res.json()['access_token']
        header = {
            "Authorization": f"Bearer {access_token}"
        }

        data = {"email": "testuser@localhost",
                "password": "testpassword"}

        url = "http://localhost:8000/apis/flush"
        res = requests.delete(url=url, data=data, headers=header)

        self.assertEqual(res.status_code, 200)
        