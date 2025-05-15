from django.core.management.base import BaseCommand
from music.models import Artist, Album, Track

class Command(BaseCommand):
    help = 'Seed database with artists, albums, and tracks'

    def handle(self, *args, **kwargs):
        
        artist, _ = Artist.objects.get_or_create(name="Bruno Mars")
        artist1, _ = Artist.objects.get_or_create(name="Eminem")
      

        
        album1, _ = Album.objects.get_or_create(name="Bruno Mar Album", artist=artist)
        album2, _ = Album.objects.get_or_create(name="Eminem Album", artist=artist1)

        # Create tracks
        Track.objects.get_or_create(title="Die with a smile", album=album1, duration=186 , artists=artist , audio_url="https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/Lady+Gaga%2C+Bruno+Mars+-+Die+With+A+Smile+(Official+Music+Video).mp3")
        Track.objects.get_or_create(title="Guts Over Fear", album=album2, duration=177 , artist=artist1 , audio_url="https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/Eminem+-+Guts+Over+Fear+ft.+Sia+(Lyric+Video).mp3")

       

        self.stdout.write(self.style.SUCCESS('✅ Seeded music data successfully'))