import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';

const AlbumCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput source="artist" reference="artists">
                <SelectInput optionText="name" />
            </ReferenceInput>
            
        </SimpleForm>
    </Create>
);

export default AlbumCreate;