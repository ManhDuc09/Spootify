import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';

const AlbumEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" />
            <ReferenceInput source="artist" reference="artists">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export default AlbumEdit;