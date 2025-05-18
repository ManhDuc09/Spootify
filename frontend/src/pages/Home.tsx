import { useEffect, useState } from 'react';
import MusicCard from '../components/MusicCard';

import { fetchAllAlbums } from '../api/albumService';
import { Album } from '../types';

function Home() {
    const [albums, setAlbum] = useState<Album[]>([]);

    useEffect(() => {
        const fetchAlbum = async () => {
             try {
                const data = await fetchAllAlbums();
                setAlbum(data);
            } catch (error) {
                console.error("Error loading albums:", error);
            }
        };
        fetchAlbum();
    }, []
    );

    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Trending Music</h1>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {albums.map((album: any) =>
                        <MusicCard
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
                <h1 className="text-2xl font-bold mb-4">Trending Music</h1>

                <div className="flex gap-4 overflow-x-auto pb-4">


                </div>

            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Trending Music</h1>

                <div className="flex gap-4 overflow-x-auto pb-4">


                </div>

            </div>
        </>

    )
}
export default Home;