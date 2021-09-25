import re

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Post, Comment


class AuthorSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField('avatar_url_field')

    # 서버에서 실제로 api host 지정하기 위한 함수
    def avatar_url_field(self, author):
        # same author.avatar_url.startswith("https://") or author.avatar_url.startswith("http://")
        if re.match(r"^https?://", author.avatar_url):
            return author.avatar_url

        if 'request' in self.context:
            scheme = self.context['request'].scheme  # http or https
            host = self.context['request'].get_host()  # 남은 주소 호스트
            return scheme +'://' + host + author.avatar_url

    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'author_name',
            'avatar_url',
        ]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField('is_like_field')

    # view단에 get_serializer_context에서 선언한 request 사용
    def is_like_field(self, post):
        if 'request' in self.context:
            user = self.context['request'].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = Post
        fields = [
            'id',
            'author',
            'created_at',
            'updated_at',
            'photo',
            'caption',
            'tag_set',
            'is_like'
        ]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id',
            'author',
            'message',
            'created_at',
        ]
