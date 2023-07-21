from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def endpoints(request):
  data = [
    "/api/register",
    "/api/login",
    "/api/idea",
  ]
  return Response(data)