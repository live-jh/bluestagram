from django.core.mail import send_mail
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
# from django.shortcuts import resolve_url
from django.shortcuts import resolve_url
from django.template.loader import render_to_string
from django.conf import settings


class User(AbstractUser):
    class GenderChoices(models.TextChoices):
        MALE = "M", "Male"
        FEMALE = "F", "FeMale"

    follower_set = models.ManyToManyField("self", blank=True)
    following_set = models.ManyToManyField("self", blank=True)
    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True,
                                    validators=[
                                        RegexValidator(r"^010-?[0-9]\d{3}-?\d{4}$")
                                    ])  # 정규표현식 (핸드폰번호) til-views 참고
    gender = models.CharField(max_length=5, choices=GenderChoices.choices, blank=True)
    avatar = models.ImageField(
        blank=True, upload_to="account/avatar/%Y-%m-%d", help_text="48px * 48px 크기의 png, jpg 파일을 업로드해주세요."
    )

    @property
    def author_name(self):  # 작성자명으로 접근시 규칙 정의
        return f"{self.first_name} {self.last_name}"

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.username)

    # template을 이용해 문자열 응답 생성시 -> render_to_string
    def send_welcome_email(self):
        subject = render_to_string("accounts/welcome_email_subject.txt", {
            "user": self,
        })
        content = render_to_string("accounts/welcome_email_content.txt", {
            "user": self,
        })
        sender_email = settings.WELCOME_EMAIL_SENDER
        send_mail(subject, content, sender_email, [self.email], fail_silently=False)
