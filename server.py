import unittest
from unittest.mock import patch
from flask import Flask
from server import app

# test_server.py


class ServerTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    @patch('server.GPIO.output')
    def test_pin_on(self, mock_gpio_output):
        response = self.app.get('/pinon')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'I turned on the pin.', response.data)
        mock_gpio_output.assert_called_with(16, True)

    @patch('server.GPIO.output')
    def test_pin_off(self, mock_gpio_output):
        response = self.app.get('/pinoff')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'I turned off the pin.', response.data)
        mock_gpio_output.assert_called_with(16, False)


if __name__ == '__main__':
    unittest.main()
