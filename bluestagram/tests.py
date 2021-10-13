from unittest import TestCase
from django.test import Client
from rest_framework import status
from django.urls import reverse


class DashboardCase(TestCase):
    def setUp(self):
        print("1. Executing the setUp method")
        self.client = Client()

    def test_something(self):
        print("2. Executing the tearDown method")
        self.assertEqual(True, True)

    def test_url_status_code(self):
        response = self.client.get('api/')  # url test
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, status.HTTP_200_OK)
