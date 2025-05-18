from django.shortcuts import render
from .models import CustomUser as User
from .models.track import Track
from .models import Album , Artist

from .pagination import ReactAdminPagination

<<<<<<< HEAD
from .serializers import TrackSerializer , AlbumSerializer , UserInfoSerializer
=======
from .serializers import TrackSerializer , AlbumSerializer , ArtistSerializer
>>>>>>> c57ee05d12a0eb888eb729aa9f64e82f810973c1
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
<<<<<<< HEAD
from rest_framework.generics import ListAPIView , RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

=======
from rest_framework.generics import ListAPIView , RetrieveAPIView , RetrieveUpdateAPIView , DestroyAPIView , ListCreateAPIView
>>>>>>> c57ee05d12a0eb888eb729aa9f64e82f810973c1

from django.contrib.auth.hashers import make_password  # Import make_password

class LoginView(TokenObtainPairView):
    """
    View for user login using JWT.
    """
    pass

class RefreshTokenView(TokenRefreshView):
    """
    View for refreshing JWT tokens.
    """
    pass



class AlbumDetailView(RetrieveUpdateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [AllowAny]

class AlbumListView(ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [AllowAny]
    pagination_class = ReactAdminPagination

    
class AlbumDeleteView(DestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [AllowAny]



class TrackListView(ListAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [AllowAny]
    pagination_class = ReactAdminPagination

<<<<<<< HEAD
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserInfoSerializer(request.user)
        return Response(serializer.data)
=======
class ArtistListView(ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [AllowAny]
    pagination_class = ReactAdminPagination

>>>>>>> c57ee05d12a0eb888eb729aa9f64e82f810973c1

@api_view(['POST'])
def logout_view(request):
    try:
        request.auth.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    data = request.data
    
    if not data.get('email') or not data.get('password'):
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=data['email']).exists():
        return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=data['email'],
        email=data['email'],
        password=make_password(data['password'])  # Hash mật khẩu
    )
    
    return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
