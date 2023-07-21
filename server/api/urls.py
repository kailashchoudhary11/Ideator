from django.urls import path 
from .views import endpoints, LoginUser

urlpatterns = [
  path("", endpoints, name="endpoints"),
  path("login/", LoginUser.as_view(), name="login"),
]
