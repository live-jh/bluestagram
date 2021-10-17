from .common import *

env_json = join(BASE_DIR, 'config/common/env.json')

with open(env_json) as f:
    secrets = json.loads(f.read())['product']


# SECURITY WARNING: keep the secret key used in production secret!
def get_secret(key, secrets=secrets):
    """비밀 변수를 가져오거나 명시적 예외를 반환한다."""
    try:
        return secrets[key]
    except KeyError:
        error_msg = "Set the {} environment variable".format(key)
        raise ImproperlyConfigured(error_msg)


SECRET_KEY = get_secret('product')
DATABASES = secrets['DATABASES']

# redix cache

# app
INSTALLED_APPS += [
    'account',
    'bluestagram'
]

ALLOWED_HOSTS = ['*']

# jwt key를 암호화할때 사용
JWT_AUTH['JWT_SECRET_KEY'] = SECRET_KEY

