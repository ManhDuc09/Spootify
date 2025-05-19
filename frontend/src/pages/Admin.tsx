import { Admin, Resource } from 'react-admin';
import DataProvider from '../dataprovider/DataProvider';

import AlbumList from '../components/admin/album/AlbumList';
import TrackList from '../components/admin/track/TrackList';
import AlbumEdit from '../components/admin/album/AlbumEdit';
import AlbumCreate from '../components/admin/album/AlbumCreate';
<<<<<<< HEAD
=======
import TrackEdit from '../components/admin/track/TrackEdit';
import TrackCreate from '../components/admin/track/TrackCreate';
>>>>>>> 82b2c8f04459e3acd47e68461b98cf7fa192c180



const AdminPanel = () => {
    return (
        <Admin dataProvider={DataProvider} basename="/admin">
            <Resource name="albums" 
            list={AlbumList}
            edit={AlbumEdit}
            create={AlbumCreate} />


<<<<<<< HEAD
            <Resource name="tracks" list={TrackList} />
=======
            <Resource name="tracks" list={TrackList} 
            edit={TrackEdit}
            create={TrackCreate}
            />
>>>>>>> 82b2c8f04459e3acd47e68461b98cf7fa192c180
        </Admin>
    );
};

export default AdminPanel;
