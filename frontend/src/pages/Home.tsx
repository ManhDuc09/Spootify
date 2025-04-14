

import MusicCard from '../components/MusicCard';
import MusicPlayer from '../components/MusicPlayer'
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
                />
                 <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                />
                 <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                />
                 <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                />
                 <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                />
                <MusicCard
                    title="Save Your Tears"
                    artist="The Weeknd"
                    image="https://link-to-another-cover.jpg"
                />
                <MusicCard
                    title="In Your Eyes"
                    artist="The Weeknd"
                    image="https://yet-another-image.jpg"
                />
          
            </div>

        </div>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trending Music</h1>

            <div className="flex gap-4 overflow-x-auto pb-4">
                <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                />
                <MusicCard
                    title="Save Your Tears"
                    artist="The Weeknd"
                    image="https://link-to-another-cover.jpg"
                />
                <MusicCard
                    title="In Your Eyes"
                    artist="The Weeknd"
                    image="https://yet-another-image.jpg"
                />
          
            </div>

        </div>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trending Music</h1>

            <div className="flex gap-4 overflow-x-auto pb-4">
                <MusicCard
                    title="Blinding Lights"
                    artist="The Weeknd"
                    image="https://link-to-album-cover.jpg"
                />
                <MusicCard
                    title="Save Your Tears"
                    artist="The Weeknd"
                    image="https://link-to-another-cover.jpg"
                />
                <MusicCard
                    title="In Your Eyes"
                    artist="The Weeknd"
                    image="https://yet-another-image.jpg"
                />
          
            </div>

        </div>
        </>
        
    )
}
export default Home;