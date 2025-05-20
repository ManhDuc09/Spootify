import { List, Datagrid, TextField, FunctionField, ReferenceArrayField, SingleFieldList, ChipField } from 'react-admin';

const ArtistList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="genre" />
        </Datagrid>
    </List>
);

export default ArtistList;