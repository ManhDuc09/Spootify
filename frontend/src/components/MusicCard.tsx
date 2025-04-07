
type MusicCardProps = {
    title: string;
    artist: string;
    image: string;
};
const MusicCard = ({ title, artist, image }:MusicCardProps) => {
    return (
        <div className="w-full sm:w-64 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden group">
            {/* Image */}
            <div className="relative">
                <img
                    src={image}
                    alt="Album Art"
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4l12 6-12 6V4z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800 truncate">{title}</h3>
                <p className="text-sm text-gray-500 truncate">{artist}</p>
            </div>
        </div>
    );
};

export default MusicCard;
