import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin";

const UserEdit = () => {
    return (
        <Edit
            transform={(data) => {
                // Rename `email` to `username` before sending
                if (data.email) {
                    data.username = data.email;
                }
                return data;
            }}
        >
            <SimpleForm>
                <TextInput source="id" disabled />

                <TextInput
                    source="email"
                    label="Email"
                    defaultValue=""
                    // This ensures the email field gets populated from username
                    format={(v, record) => record?.username || ""}
                />

                <SelectInput
                    source="role"
                    label="Role"
                    choices={[
                        { id: 'user', name: 'User' },
                        { id: 'admin', name: 'Admin' },
                    ]}
                />
            </SimpleForm>
        </Edit>
    );
};

export default UserEdit;
