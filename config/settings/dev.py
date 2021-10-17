from .common import *

env_json = join(BASE_DIR, 'config/common/env.json')

with open(env_json) as f:
    secrets = json.loads(f.read())['development']


def get_secret(key, secrets=secrets):
    """비밀 변수를 가져오거나 명시적 예외를 반환한다."""
    try:
        return secrets[key]
    except KeyError:
        error_msg = "Set the {} environment variable".format(key)
        raise ImproperlyConfigured(error_msg)


SECRET_KEY = get_secret('SECRET_KEY')
DATABASES = secrets['DATABASES']

# 맨 뒤에 추가
INSTALLED_APPS += [
    'debug_toolbar',
    'account',
    'bluestagram'
]

ALLOWED_HOSTS = []

# 맨 앞에 추가
MIDDLEWARE = ['debug_toolbar.middleware.DebugToolbarMiddleware', ] + MIDDLEWARE

INTERNAL_IPS = ['127.0.0.1']

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]

# jwt key를 암호화할때 사용
JWT_AUTH['JWT_SECRET_KEY'] = SECRET_KEY
