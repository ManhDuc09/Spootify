import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const mockAlbumData = (albumId: string) => ({
  title: `Album Title ${albumId}`,
  artist: `Artist ${albumId}`,
  coverUrl: `https://via.placeholder.com/150?text=Album+${albumId}`,
  tracks: [
    { title: `Track 1 ${albumId}`, duration: 200 },
    { title: `Track 2 ${albumId}`, duration: 180 },
  ],
});

const AlbumPage = () => {
  const { albumId } = useParams(); 
  const [album, setAlbum] = useState<any>(null);

  useEffect(() => {
    if (albumId) {
 
      const data = mockAlbumData(albumId);
      setAlbum(data);
    }
  }, [albumId]);

  if (!album) return <div>Loading...</div>;

  return (
    <div>
      <h1>{album.title}</h1>
      <h2>{album.artist}</h2>
      <img src={album.coverUrl} alt={album.title} />
      <div>
        <h3>Tracks:</h3>
        <ul>
          {album.tracks.map((track: any, index: number) => (
            <li key={index}>
              {track.title} - {track.duration} seconds
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumPage;
