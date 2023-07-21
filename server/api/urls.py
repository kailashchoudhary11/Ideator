from django.urls import path 
from .views import endpoints

urlpatterns = [
  path("", endpoints, name="endpoints"),
]
