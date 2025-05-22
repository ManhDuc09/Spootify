import { List, Datagrid, TextField, FunctionField, ReferenceArrayField, SingleFieldList, ChipField } from 'react-admin';

const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="role" />
        </Datagrid>
    </List>
);

export default UserList;