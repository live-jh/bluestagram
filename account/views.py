from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .account_serializers import SignUpSeiralizer
from django.contrib.auth import get_user_model

User = get_user_model()


class SignUpView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignUpSeiralizer
    permission_classes = [
        AllowAny
    ]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            'status': status.HTTP_200_OK,
            'message': 'success',
            'data': response.data
        })

