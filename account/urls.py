from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from account.views import SignUpView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('token/', obtain_jwt_token),
    path('token/refresh/', refresh_jwt_token),
    path('token/refresh/', refresh_jwt_token),
    path('token/verify/', verify_jwt_token),

]
