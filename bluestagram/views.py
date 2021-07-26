from datetime import timedelta

from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from .bluestagram_serializers import PostSerializer
from .models import Post


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # permission_classes = [AllowAny]

    # viewset, class 기반 view 에서 get_query_set 재정의 가능
    def get_queryset(self):
        timesince = timezone.now() - timedelta(days=3)  # 일자 가능

        qs = super().get_queryset()  # 로그인 되어 있음을 보장
        qs = qs.filter(
            Q(author=self.request.user) |
            Q(author__in=self.request.user.following_set.all())  # 내가 팔로우 한 목록
        )
        qs = qs.filter(created_at__gte=timesince)
        return qs


# class PostAPI(APIView):
#     def get(self, request):
#         post_set = Post.objects.all()
#         context = {
#             'post_set': PostSerializer(post_set, many=True).data
#         }
#         return Response(context, status=status.HTTP_200_OK)


class CommentAPI(APIView):
    def get(self, request):
        pass
