from django.shortcuts import render

# Create your views here.
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
    permission_classes = [AllowAny]


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
