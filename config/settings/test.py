from config.settings.common import *
from config.settings.dev import *
import django
django.setup()

TEST_RUNNER = 'config.test_runner.TestRunner'
