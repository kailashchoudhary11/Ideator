from django.urls import path 
from .views import endpoints, LoginUser, LogoutUser, RegisterUser, UserProfile, SkillsView, CheckAuth

urlpatterns = [
  path("", endpoints, name="endpoints"),
  path("login/", LoginUser.as_view(), name="login-user"),
  path("logout/", LogoutUser.as_view(), name="logout-user"),
  path("register/", RegisterUser.as_view(), name="register-user"),
  path("profile/", UserProfile.as_view(), name="user-profile"),
  path("skills/", SkillsView.as_view(), name="user-skills"),
  path("check_auth/", CheckAuth.as_view(), name="check-auth"),
]
