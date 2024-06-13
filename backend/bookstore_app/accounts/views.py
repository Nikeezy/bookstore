from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserRegistrationSerializer, UserLoginSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request: Request) -> Response:
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request: Request) -> Response:
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({'message': 'User logout successfully.'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        return Response({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        })