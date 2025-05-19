from django.core.management.base import BaseCommand
from music.models import Artist, Album, Track

class Command(BaseCommand):
    help = 'Seed database with artists, albums, and tracks'

    def handle(self, *args, **kwargs):
        # Get or create artists - unpack the tuple
        artist1, _ = Artist.objects.get_or_create(name="Eminem")
        artist2, _ = Artist.objects.get_or_create(name="Sia")
        artist3, _ = Artist.objects.get_or_create(name="Bruno Mars")
        
        album1, _ = Album.objects.get_or_create(name="The Eminem Show", artist=artist1)
        album2, _ = Album.objects.get_or_create(name="Bruno Mars Show", artist=artist3)

        # Create tracks
        track2 = Track.objects.create(
            name="Thats What I Like",
            duration=240,
            audio_url="https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/Bruno+Mars+-+Thats+What+I+Like+%5BOfficial+Music+Video%5D.mp3",
            cover_url="thats-what-i-like.jpg",
            album=album2  
        )

        track1 = Track.objects.create(
            name="Guts Over Fear",
            duration=290,
            audio_url="https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/Eminem+-+Guts+Over+Fear+ft.+Sia+(Lyric+Video).mp3",
            cover_url="without-me-cover.jpg",
            album=album1 
        )

        track3 = Track.objects.create(
            name="Die with a smile",
            duration=300,
            audio_url="https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/Lady+Gaga%2C+Bruno+Mars+-+Die+With+A+Smile+(Official+Music+Video).mp3",
            cover_url="die-with-a-smile.jpg",
            album=album2  
        )
        
       
        track1.artists.add(artist1, artist2)
        track2.artists.add(artist3)
        track3.artists.add(artist3)
        
        self.stdout.write(self.style.SUCCESS('✅ Seeded music data successfully'))
