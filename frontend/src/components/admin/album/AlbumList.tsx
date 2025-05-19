import { List, Datagrid, TextField, FunctionField, ReferenceInput, SelectInput, ReferenceField } from 'react-admin';


const AlbumList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
<<<<<<< HEAD
            <ReferenceField source="artist" reference="artists">
=======
            <ReferenceField source="artist_id" reference="artists">
>>>>>>> 82b2c8f04459e3acd47e68461b98cf7fa192c180
                <TextField source="name" />
            </ReferenceField>
            <FunctionField
                label="Tracks Count"
                render={record => record?.tracks ? record.tracks.length : 0}
            />
        </Datagrid>
    </List>
);

export default AlbumList;
