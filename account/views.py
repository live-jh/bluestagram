from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .account_serializers import SignUpSeiralizer, SuggestionUserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class SignUpAPI(CreateAPIView):
    model = get_user_model()
    serializer_class = SignUpSeiralizer
    permission_classes = [
        AllowAny
    ]

    def create(self, request, *args, **kwargs):  # post시 call override 재정의
        response = super().create(request, *args, **kwargs)
        return Response({
            'status': status.HTTP_200_OK,
            'message': 'success',
            'data': response.data
        })


class SuggestionListAPI(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = SuggestionUserSerializer
