// pages/SearchResults.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAllAlbums } from '../api/albumService';
import { fetchAllArtists } from '../api/artistService';
import MusicCard from '../components/MusicCard';
import ArtistCard from '../components/ArtistCard';
import { Album, Artist } from '../types';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const queryParam = useQuery().get('q')?.toLowerCase() ?? '';

  useEffect(() => {
    const fetchData = async () => {
      const allAlbums = await fetchAllAlbums();
      const allArtists = await fetchAllArtists();
      setAlbums(allAlbums);
      setArtists(allArtists);
    };
    fetchData();
  }, []);

  const filteredAlbums = albums.filter((a) =>
    a.name.toLowerCase().includes(queryParam)
  );
  const filteredArtists = artists.filter((a) =>
    a.name.toLowerCase().includes(queryParam)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{queryParam}"</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Albums</h2>
        <div className="flex gap-4 overflow-x-auto">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map((album) => (
              <MusicCard
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
            filteredArtists.map((artist) => (
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
