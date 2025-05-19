import { List, Datagrid, TextField, FunctionField, ReferenceInput, SelectInput, ReferenceField } from 'react-admin';


const AlbumList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="artist_id" reference="artists">
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
