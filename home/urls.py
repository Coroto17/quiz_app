from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("rest-auth/", include("dj_rest_auth.urls")),
    path("rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("admin/", admin.site.urls),
    re_path(
        r"^service-worker.js",
        TemplateView.as_view(
            template_name="service-worker.js",
            content_type="application/javascript",
        ),
        name="service-worker.js",
    ),
    re_path(r"^.*", TemplateView.as_view(template_name="index.html")),
]
