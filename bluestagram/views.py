from datetime import timedelta

from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from .bluestagram_serializers import PostSerializer
from .models import Post


class PostViewSet(ModelViewSet):
    queryset = (Post.objects.all().select_related('author').prefetch_related('tag_set', 'like_user_set'))
    serializer_class = PostSerializer

    # permission_classes = [AllowAny] #인증 적용

    # viewset, class 기반 view 에서 get_query_set 재정의 가능
    def get_queryset(self):
        # timesince = timezone.now() - timedelta(days=3)  # 3일전
        # qs = qs.filter(created_at__gte=timesince)
        qs = super().get_queryset()  # 로그인 되어 있음을 보장
        qs = qs.filter(
            Q(author=self.request.user) | Q(author__in=self.request.user.following_set.all())
        ).order_by(
            '-created_at'
        )  # 내가 팔로우한 목록
        return qs

    # 클래스 기반 views에서 get_serializer 재정의 (request 사용)
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    # 저장시 로직
    def perform_create(self, serializer):
        # form logic
        # post = from.save(commit=False)
        # post.author = self.request.user
        # post.save()
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=["POST"])
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)  # delete는 no-content를 자주 사용


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
