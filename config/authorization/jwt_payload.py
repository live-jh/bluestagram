def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': {
             'username': user.username,
             'is_superuser': user.is_superuser,
             'last_login': user.last_login,
        }
    }
