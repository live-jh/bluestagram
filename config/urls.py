from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django_pydenticon.views import image as pydenticon_image

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("bluestagram.urls")),
    path('api/account/', include("account.urls")),
    path('identicon/image/<path:data>/', pydenticon_image, name='pydenticon_image'),
    # pydenticon -> random image account_serializer 보기
]

if settings.DEBUG:
    # media_url로 시작하는 요청이 오면 media_root에서 찾아서 서빙하는 설정 (개발환경 dev일때만, 실서비스는 s3 서빙)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    import debug_toolbar

    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls))
    ]
