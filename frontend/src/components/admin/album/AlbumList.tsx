import { List, Datagrid, TextField, ReferenceField, FunctionField } from 'react-admin';

const AlbumList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="artist" reference="artists">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export default AlbumList;
