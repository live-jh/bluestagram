from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class SignUpSeiralizer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # 쓰기 전용, 임의 필드 (선언시 필드에 꼭 들어가야함)

    class Meta:
        model = User
        fields = ['pk', 'username', 'password']

    def create(self, validated_data):  # 유저 인스턴스 반환
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user
