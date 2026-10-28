from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

handler400 = "main.views.handler400"
handler403 = "main.views.handler403"
handler404 = "main.views.handler404"
handler500 = "main.views.handler500"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("main.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
