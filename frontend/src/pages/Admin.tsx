import { Admin, Resource } from 'react-admin';
import DataProvider from '../dataprovider/DataProvider';

import AlbumList from '../components/admin/album/AlbumList';
import TrackList from '../components/admin/track/TrackList';
import AlbumEdit from '../components/admin/album/AlbumEdit';
import AlbumCreate from '../components/admin/album/AlbumCreate';
import TrackEdit from '../components/admin/track/TrackEdit';



const AdminPanel = () => {
    return (
        <Admin dataProvider={DataProvider} basename="/admin">
            <Resource name="albums" 
            list={AlbumList}
            edit={AlbumEdit}
            create={AlbumCreate} />


            <Resource name="tracks" list={TrackList} 
            edit={TrackEdit}/>
        </Admin>
    );
};

export default AdminPanel;
