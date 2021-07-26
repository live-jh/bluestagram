from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from account.views import SignUpAPI, SuggestionListAPI

urlpatterns = [
    path('signup/', SignUpAPI.as_view(), name='signup'),
    path('token/', obtain_jwt_token),
    path('token/refresh/', refresh_jwt_token),
    path('token/verify/', verify_jwt_token),
    path('suggestions/', SuggestionListAPI.as_view(), name='suggestion_user_list'),

]
