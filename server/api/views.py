from .models import Skill, Theme, Idea
from .serializers import UserSerializer, SkillSerializer, ThemeSerializer, IdeaSerializer

from django.contrib.auth import login, authenticate

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def endpoints(request):
  data = [
    "/api/register",
    "/api/login",
    "/api/idea",
  ]
  return Response(data)

class RegisterUser(APIView):
  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({"response": "User Created"})
    errors = dict(serializer.errors)
    return Response({"errors": errors})

class LoginUser(APIView):
  def post(self, request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)

    if user is not None:
      login(request, user)
      return Response({"message": "Logged in successfully"})

    return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user = request.user
    serializer = SkillSerializer(user.skill_set.all(), many=True)
    skills = serializer.data
    
    data = {
      "username": user.username,
      "email": user.email,
      "first_name": user.first_name,
      "last_name": user.last_name,
      "skills": skills,
    }
    return Response(data)
  
  def post(self, request):
    request.user.skill_set.clear()

    skill_ids = request.data.get('skills')
    skills = []
    for skill_id in skill_ids:
      if skill_id == '': continue
      try:
        skill = Skill.objects.get(id=int(skill_id))
      except Skill.DoesNotExist:
        continue
      skills.append(skill)
    
    request.user.skill_set.add(*skills)

    return Response({"success": "Skills Added"})
  
class SkillsView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    skills = Skill.objects.all()
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data)

class ThemesView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    skills = Theme.objects.all()
    serializer = ThemeSerializer(skills, many=True)
    return Response(serializer.data)

class IdeasView(APIView):
  
  permission_classes = [IsAuthenticated]

  def post(self, request):
    theme_id = request.data.get("theme")
    include_skills = request.data.get("includeSkills")
    ideas = []

    if include_skills:
      user_skills = request.user.skill_set.all();
      for skill in user_skills:
        serializer = IdeaSerializer(skill.idea_set, many=True)
        ideas.extend(serializer.data)
    try:
      theme = Theme.objects.get(id=int(theme_id))
      serializer = IdeaSerializer(theme.idea_set, many=True)
      ideas.extend(serializer.data)
    except Exception as e:
      pass
    
    ideas = {item["idea"] for item in ideas}

    return Response(ideas)