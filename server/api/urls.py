from django.urls import path 
from .views import endpoints, LoginUser, RegisterUser

urlpatterns = [
  path("", endpoints, name="endpoints"),
  path("login/", LoginUser.as_view(), name="login-user"),
  path("register/", RegisterUser.as_view(), name="register-user"),
]
