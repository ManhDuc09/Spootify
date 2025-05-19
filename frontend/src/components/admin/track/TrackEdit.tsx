import { Edit, SimpleForm, TextField, ReferenceArrayField, SingleFieldList, ChipField, TextInput, FunctionField, ReferenceArrayInput, SelectArrayInput } from 'react-admin';

const TrackEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <ReferenceArrayInput source="artist_ids" reference="artists">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export default TrackEdit;
