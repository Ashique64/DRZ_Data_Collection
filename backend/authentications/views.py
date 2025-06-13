from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response

# Create your views here.


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            # print(f"User authenticated: {user}, Is superuser: {user.is_superuser}")
            if user.is_superuser:
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token

                return Response(
                    {
                        "access": str(access_token),
                        "refresh": str(refresh),
                        "username": user.username,
                        "user_id": user.id,
                        "message": "Login successful",
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Only superusers can log in."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
            )
