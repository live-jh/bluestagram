import re

from django.conf import settings
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(TimestampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="bluestagram/feed/%Y/%m-%d")
    caption = models.CharField(max_length=50)
    tag_set = models.ManyToManyField('Tag', blank=True)
    like_user_set = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='like_post_set')

    def __str__(self):
        return self.caption

    def extract_tag_list(self):
        # 리스트로 반환
        tag_list = []
        # 정규표현식 영어알파벳, 한글로 지정된 것들에 단어가 1회 이상 반복 (extract 하고 싶은 영역만 소괄호로 묶기)
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.caption)
        for tag in tag_name_list:
            tag, _ = Tag.objects.get_or_create(name=tag)
            tag_list.append(tag)
        return tag_list

    # def get_absolute_url(self):  # todo -> redirect(model명)
    #     return reverse('instagram:post_detail', args=[self.pk])

    def is_like_user(self, user):
        return self.like_use_set.filter(pk=user.pk).exists()  # 존재할때 1


class Comment(TimestampedModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ['-id']  # 최신


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
