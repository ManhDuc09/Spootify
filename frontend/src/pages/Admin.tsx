import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

import AlbumList from '../resources/AlbumList';
import TrackList from '../resources/TrackList';

const dataProvider = restProvider('http://localhost:8000/api');

const AdminPanel = () => {
    return (
        <Admin dataProvider={dataProvider} basename="/admin">
            <Resource name="albums" list={AlbumList} />
            <Resource name="tracks" list={TrackList} />
        </Admin>
    );
};

export default AdminPanel;
