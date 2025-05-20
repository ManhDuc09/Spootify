import { Link } from "react-router-dom";

type ArtistCardProps = {
  name: string;
  image: string;
  artistId: number;
};

const ArtistCard = ({ name, image, artistId }: ArtistCardProps) => {
  return (
    <Link to={`/artist/${artistId}`} className="w-full sm:w-48 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden group">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
      </div>
    </Link>
  );
};

export default ArtistCard;