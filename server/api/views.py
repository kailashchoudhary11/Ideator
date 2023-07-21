from .serializers import UserSerializer

from django.contrib.auth import login, authenticate

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


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

