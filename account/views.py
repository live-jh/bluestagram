from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
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


# 함수형으로 간단히 구현
@api_view(['POST'])  # decorator
def user_follow(request):
    username = request.data['username']
    follow_user = get_object_or_404(User, username=username, is_active=True)
    request.user.following_set.add(follow_user)
    follow_user.follower_set.add(request.user)
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def user_unfollow(request):
    username = request.data['username']
    follow_user = get_object_or_404(User, username=username, is_active=True)
    request.user.following_set.remove(follow_user)
    follow_user.follower_set.remove(request.user)
    return Response(status=status.HTTP_204_NO_CONTENT)
