from datetime import timedelta

from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from .bluestagram_serializers import PostSerializer, CommentSerializer
from .models import Post, Comment


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

    # 클래스 기반 views에서 get_serializer 재정의 (serializer에서 request 객체를 사용해야할 때)
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request  # request 추가
        return context

    # 저장시 로직
    def perform_create(self, serializer):
        # form logic
        # post = from.save(commit=False)
        # post.author = self.request.user
        # post.save()
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    # ViewSet에서 지원하는 extra action (crud외 추가 api 구현시 사용)
    @action(detail=True, methods=["POST"])  # detail false => list
    def like(self, request, pk=None):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete  # delete method mapping
    def unlike(self, request, pk=None):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)  # delete는 no-content를 자주 사용


# class CommentAPI(APIView):
#     def get(self, request):
#         pass
class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        qs = super().get_queryset()  # 로그인 되어 있음을 보장
        qs = qs.filter(post__pk=self.kwargs['post_id']).order_by('created_at')  # 해당 글의 댓글
        return qs

    # 클래스 기반 views에서 get_serializer 재정의 (serializer에서 request 객체를 사용해야할 때)
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request  # request 추가
        return context

    # 저장시 로직
    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_id'])  # 댓글 저장할 타겟 post 지정
        serializer.save(author=self.request.user, post=post)  # 댓글 저장시 로그인한 유저를 저장
        return super().perform_create(serializer)
