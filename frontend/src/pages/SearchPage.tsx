// pages/SearchResults.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAllAlbums } from '../api/albumService';
import { fetchAllArtists } from '../api/artistService';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import { Album, Artist, Track } from '../types';
import { fetchAllTrack } from '../api/trackService';
import TrackCard from '../components/TrackCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);  
  const queryParam = useQuery().get('q')?.toLowerCase() ?? '';

  useEffect(() => {
    const fetchData = async () => {
      const allAlbums = await fetchAllAlbums();
      const allArtists = await fetchAllArtists();
      const allTracks = await fetchAllTrack();
      setAlbums(allAlbums);
      setArtists(allArtists);
      setTracks(allTracks);
    };
    fetchData();
  }, []);

  const filteredAlbums = albums.filter((a) =>
    a.name.toLowerCase().includes(queryParam)
  );
  const filteredArtists = artists.filter((a) =>
    a.name.toLowerCase().includes(queryParam)
  );
  const filteredTracks = tracks.filter((t) =>
    t.name.toLowerCase().includes(queryParam)
  );
  console.log("prefilterd Tracks:", tracks);
  console.log("Filtered Tracks:", filteredTracks);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{queryParam}"</h1>
      
      

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Tracks</h2>
        <div className="flex gap-4 overflow-x-auto">
          {filteredTracks.length > 0 ? (
      
            filteredTracks.slice(0,5).map((track) => (
              <TrackCard
                key={track.id}
                title={track.name}
                artist={track.artist?.name || 'Unknown Artist'}
                image={track.coverUrl || 'https://via.placeholder.com/150'}
                trackId={track.id}
              />
            ))
          ) : (
            <p>No track found.</p>
          )}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Albums</h2>
        <div className="flex gap-4 overflow-x-auto">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                title={album.name}
                artist={album.artist?.name || 'Unknown Artist'}
                image={album.coverUrl || 'https://via.placeholder.com/150'}
                albumId={album.id}
              />
            ))
          ) : (
            <p>No albums found.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Artists</h2>
        <div className="flex gap-4 overflow-x-auto">
          {filteredArtists.length > 0 ? (
            filteredArtists.slice(0,8).map((artist) => (
              <ArtistCard
                key={artist.id}
                artistId={artist.id}
                name={artist.name}
                image={artist.image || 'https://via.placeholder.com/150'}
              />
            ))
          ) : (
            <p>No artists found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
