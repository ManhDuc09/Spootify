import { Admin, Resource } from 'react-admin';
import DataProvider from '../layouts/components/dataprovider/DataProvider';

import AlbumList from '../components/admin/album/AlbumList';
import TrackList from '../components/admin/track/TrackList';
import AlbumEdit from '../components/admin/album/AlbumEdit';
import AlbumCreate from '../components/admin/album/AlbumCreate';
import TrackEdit from '../components/admin/track/TrackEdit';
import TrackCreate from '../components/admin/track/TrackCreate';
import ArtistList from '../components/admin/artists/ArtistList';
import ArtistEdit from '../components/admin/artists/ArtistEdit';
import ArtistCreate from '../components/admin/artists/ArtistCreate';
import UserList from '../components/admin/user/UserList';
import UserEdit from '../components/admin/user/UserEdit';



const AdminPanel = () => {
    return (
        <Admin dataProvider={DataProvider} basename="/admin">
            <Resource name="albums"
                list={AlbumList}
                edit={AlbumEdit}
                create={AlbumCreate} />


            <Resource name="tracks" list={TrackList}
                edit={TrackEdit}
                create={TrackCreate}
            />
            <Resource name="artists" list={ArtistList}
                edit={ArtistEdit}
                create={ArtistCreate} />
            <Resource name="users" list={UserList}
                edit={UserEdit}
            />
        </Admin>
    );
};

export default AdminPanel;
