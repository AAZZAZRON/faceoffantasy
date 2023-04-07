from django.contrib import admin
from django.urls import path, re_path
from pages.views import FrontendRenderView

urlpatterns = [
    path('admin/', admin.site.urls),

    re_path(r'(?P<path>.*)', FrontendRenderView.as_view(), name='home'),
]
