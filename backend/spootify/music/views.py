from django.shortcuts import render
from .models import CustomUser as User
from .models.track import Track
from .models import Album , Artist, Playlist 
from .models import ChatMessage
from django.db.models import Q
from music.models import ChatMessage


from .pagination import ReactAdminPagination
import boto3
from django.conf import settings
import uuid
from rest_framework.parsers import MultiPartParser
from urllib.parse import quote

from .serializers import TrackSerializer , AlbumSerializer , UserInfoSerializer
from .serializers import TrackSerializer , AlbumSerializer , ArtistSerializer , PlaylistSerializer , UserSerializer , PlaylistDetailSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view, permission_classes , parser_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView , RetrieveAPIView , RetrieveUpdateDestroyAPIView 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework.generics import ListAPIView , RetrieveAPIView , RetrieveUpdateAPIView , DestroyAPIView , ListCreateAPIView

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



class AlbumDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [AllowAny]

class AlbumListView(ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [AllowAny]
    pagination_class = ReactAdminPagination

class TracksByArtistView(ListAPIView):
    serializer_class = TrackSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        artist_id = self.kwargs.get('artist_id')
        return Track.objects.filter(artists__id=artist_id)



class TrackDetailView(RetrieveUpdateDestroyAPIView ):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [AllowAny]
    pagination_class = ReactAdminPagination
class TrackListView(ListCreateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [AllowAny]
    pagination_class = ReactAdminPagination



class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserInfoSerializer(request.user)
        return Response(serializer.data)

class ArtistListView(ListCreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [AllowAny]
    pagination_class = ReactAdminPagination
class ArtistDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [AllowAny]
    pagination_class = ReactAdminPagination

class PlaylistView(ListCreateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserList(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()

class PlaylistDetailView(RetrieveAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistDetailSerializer
    permission_classes = [IsAuthenticated]



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

@api_view(['GET'])
def get_chat_history(request):
    from_id = request.GET.get('from')
    to_id = request.GET.get('to')

    messages = ChatMessage.objects.filter(
        Q(from_user_id=from_id, to_user_id=to_id) |
        Q(from_user_id=to_id, to_user_id=from_id)
    ).order_by('timestamp')

    data = [
        {"from": m.from_user.id, "to": m.to_user.id, "message": m.message}
        for m in messages
    ]
    return Response(data)


class UploadImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]

    def post(self, request):
        image_file = request.FILES.get("file")

        if not image_file:
            return Response({"error": "No file provided."}, status=400)

        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )

        unique_name = f"album_covers/{uuid.uuid4()}_{image_file.name}"
        s3.upload_fileobj(image_file, settings.AWS_S3_BUCKET_NAME, unique_name)

        encoded_key = quote(unique_name, safe='')
        file_url = f"https://{settings.AWS_S3_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{encoded_key}"

        return Response({"url": file_url})


