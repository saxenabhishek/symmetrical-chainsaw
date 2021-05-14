from rest_framework.test import APITestCase
from rest_framework import status
import requests


class PageAPIView(APITestCase):
    
    def test_route(self):
        res = self.client.get("/products/products-api")
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class TestAuth(APITestCase):
    
    def setUp(self):
        
        data = {"username": "testuser",
                "email": "testuser@localhost",
                "password": "testpassword"}

        requests.post("http://localhost:8000/apis/register", data=data)

        self.res = requests.post("http://localhost:8000/apis/login", data=data)

    
    def test_auth_products(self):

        access_token = self.res.json()['access_token']
        header = {
            "Authorization": f"Bearer {access_token}"
        }

        data = {"email": "testuser@localhost",
                "password": "testpassword"}

        url = "http://localhost:8000/products/products-api"
        res = requests.get(url=url, data=data, headers=header)

        self.assertEqual(res.status_code, 200)


    def tearDown(self):

        access_token = self.res.json()['access_token']
        header = {
            "Authorization": f"Bearer {access_token}"
        }

        data = {"email": "testuser@localhost",
                "password": "testpassword"}

        url = "http://localhost:8000/apis/flush"
        requests.delete(url=url, data=data, headers=header)