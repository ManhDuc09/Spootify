import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

import AlbumList from '../components/admin/album/AlbumList';
import TrackList from '../components/admin/track/TrackList';
import AlbumEdit from '../components/admin/album/AlbumEdit';
import AlbumCreate from '../components/admin/album/AlbumCreate';

const dataProvider = restProvider('http://localhost:8000/api');

const AdminPanel = () => {
    return (
        <Admin dataProvider={dataProvider} basename="/admin">
            <Resource name="albums" 
            list={AlbumList}
            edit={AlbumEdit}
            create={AlbumCreate} />


            <Resource name="tracks" list={TrackList} />
        </Admin>
    );
};

export default AdminPanel;
