import MusicCard from '../components/MusicCard';
function Home() {


    return (
        <>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trending Music</h1>
            <div className="flex gap-4 overflow-x-auto pb-4">
                <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                    albumId='1'
                />
                <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                    albumId='1'
                />
                <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                    albumId='1'
                />
                <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                    albumId='1'
                />
                <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                    albumId='1'
                />
          
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