import { List, Datagrid, TextField, FunctionField, ReferenceArrayField, SingleFieldList, ChipField } from 'react-admin';

const TrackList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceArrayField label="Artists" reference="artists" source="artist_ids">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </Datagrid>
    </List>
);

export default TrackList;