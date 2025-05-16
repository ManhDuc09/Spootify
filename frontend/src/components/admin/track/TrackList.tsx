import { List, Datagrid, TextField, ReferenceField, FunctionField } from 'react-admin';

const TrackList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <FunctionField
                label="Artist"
                render={record =>
                    record.artists && record.artists.length > 0
                        ? record.artists[0].name
                        : ''
                }
            />
        </Datagrid>
    </List>
);

export default TrackList;
