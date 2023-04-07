from django.contrib import admin
from django.urls import path, re_path
from pages.views import FrontendRenderView

urlpatterns = [
    path('admin/', admin.site.urls),
]

# all other links will be redirected to the home page
urlpatterns += [
    re_path(r'(?P<path>.*)', FrontendRenderView.as_view(), name='home'),
]
