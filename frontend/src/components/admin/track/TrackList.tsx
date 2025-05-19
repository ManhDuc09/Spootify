import { List, Datagrid, TextField, FunctionField, ReferenceArrayField, SingleFieldList, ChipField } from 'react-admin';

const TrackList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
<<<<<<< HEAD
            <ReferenceArrayField label="Artists" reference="artists" source="artists">
=======
            <ReferenceArrayField label="Artists" reference="artists" source="artist_ids">
>>>>>>> 82b2c8f04459e3acd47e68461b98cf7fa192c180
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </Datagrid>
    </List>
);

export default TrackList;