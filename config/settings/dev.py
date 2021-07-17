from .common import *

# 맨 뒤에 추가
INSTALLED_APPS += [
    'debug_toolbar',
]

# 맨 앞에 추가
MIDDLEWARE = ['debug_toolbar.middleware.DebugToolbarMiddleware', ] + MIDDLEWARE

INTERNAL_IPS = ['127.0.0.1']
