from rest_framework.test import APITestCase
from rest_framework import status

class PageAPIView(APITestCase):
    
    def test_route(self):
        res = self.client.get("/products/products-api")
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)