import { useEffect, useState } from 'react';
import AlbumCard from '../components/AlbumCard';

import { fetchAllAlbums } from '../api/albumService';
import { Album, Artist, Track } from '../types';
import { fetchAllArtists } from '../api/artistService';
import ArtistCard from '../components/ArtistCard';
import { fetchAllTrack } from '../api/trackService';
import TrackCard from '../components/TrackCard';

function Home() {
    const [albums, setAlbum] = useState<Album[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [tracks , setTracks] = useState<Track[]>([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const albumData = await fetchAllAlbums();
        const artistData = await fetchAllArtists();
        const trackData = await fetchAllTrack();
        console.log("Fetched albums:", trackData);
        setTracks(trackData);
        setAlbum(albumData);
        setArtists(artistData);
        } catch (error) {
        console.error("Error loading data:", error);
        }
    };
    fetchData();
    }, []);

    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Trending Music</h1>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {tracks.slice(0, 5).map((track: any) =>
                        <TrackCard
                            key={track.id}
                            title={track.name}
                            artist={track.artist?.name || 'Unknown Artist'}
                            image={track.image || 'https://via.placeholder.com/150'}
                            trackId={track.id}
                        />
                    )}
                </div>

            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Trending Albums</h1>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {albums.slice(0, 5).map((album: any) =>
                        <AlbumCard
                            key={album.id}
                            title={album.name}
                            artist={album.artist?.name || 'Unknown Artist'}
                            image={album.image || 'https://via.placeholder.com/150'}
                            albumId={album.id}
                        />
                    )}
                </div>

            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Artists</h1>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                    {artists.map((artist: any) =>
                        <ArtistCard
                            key={artist.id}
                            artistId={artist.id}
                            name={artist.name}
                            image={artist.image || 'https://via.placeholder.com/150'}
                            
                        />
                    )}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">


                </div>

            </div>
            
        </>

    )
}
export default Home;