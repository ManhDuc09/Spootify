const MusicPlayer = () => {
    return (
        <div className="w-full">
            <div className="bg-white shadow-lg w-full px-4 py-2">
                <div className="flex items-center">
                    {/* Optional: shrink or hide on small screens */}
                    <img 
                        className="w-12 h-12 rounded hidden md:block mr-4 object-cover" 
                        src="https://tailwindcss.com/img/card-top.jpg" 
                        alt="Album" 
                    />

                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">A Sky Full of Stars</h3>
                                <p className="text-xs text-gray-500">Ghost Stories</p>
                            </div>
                            <div className="text-red-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            {/* Smaller control icons */}
                            {[
                                "M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2...",
                                "M4 5h3v10H4V5zm12 0v10l-9-5 9-5z",
                                "M5 4h3v12H5V4zm7 0h3v12h-3V4z",
                                "M13 5h3v10h-3V5zM4 5l9 5-9 5V5z",
                                "M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z",
                            ].map((d, idx) => (
                                <svg key={idx} className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d={d} />
                                </svg>
                            ))}
                        </div>

                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <p>0:40</p>
                                <p>4:20</p>
                            </div>
                            <div className="h-1 bg-gray-300 rounded-full relative">
                                <div className="w-1/5 h-1 bg-red-400 rounded-full">
                                    <span className="w-3 h-3 bg-red-400 absolute right-0 -top-1 rounded-full shadow"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
