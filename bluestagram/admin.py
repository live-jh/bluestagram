from django.contrib import admin

# Register your models here.
from django.utils.safestring import mark_safe

from .models import Post, Comment, Tag


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['author', 'photo_tag', 'photo', 'caption']
    list_display_links = ['caption']

    def photo_tag(self, post):
        return mark_safe(f'<img width="80" src={post.photo.url} />')  # 해당 문자열은 안전하다는 의미 함수


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['post', 'author', 'message']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name']
