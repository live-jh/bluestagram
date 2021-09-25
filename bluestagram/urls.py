from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

# from .views import (
#     PostAPI
# )

# urlpatterns = [
#     path('', PostAPI.as_view(), name='post_list'),
#     path('<int:post_id>', PostAPI.as_view(), name='post_detail')
# ]
router = DefaultRouter()
router.register('posts', views.PostViewSet)
router.register(r'posts/(?P<post_id>\d+)/comments', views.CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
