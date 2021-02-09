"""Use for development"""

from .base import *

ALLOWED_HOSTS += ["localhost"]
DEBUG = True

WSGI_APPLICATION = "home.wsgi.dev.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

CORS_ORIGIN_WHITELIST = ["http://localhost:3033"]