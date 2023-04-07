from django.shortcuts import render
from django.views import View
from django.http import HttpResponse

# Create your views here.

class FrontendRenderView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'base.html', {})