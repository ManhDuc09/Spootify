<<<<<<< HEAD
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
=======
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  ImageInput,
  ImageField,
  useNotify,
  useRedirect,
  Create,
} from "react-admin";
import axios from "axios";

const AlbumCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

 
  const uploadImageToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading image to S3...");
      const response = await axios.post("http://127.0.0.1:8000/api/upload-image/", formData, {
        
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.url; 
    } catch (error) {
      notify("Image upload failed", { type: "error" });
      throw error;
    }
  };

  return (
    <Create
      transform={async (data) => {
        if (data.image instanceof File) {
          const uploadedUrl = await uploadImageToS3(data.image);
          data.image = uploadedUrl;
        }

        
        const { tracks, ...rest } = data;
        return rest;
      }}

    >
      <SimpleForm>

        <TextInput source="name" fullWidth />
        <ReferenceInput source="artist_id" reference="artists">
            <SelectInput optionText="name" />
        </ReferenceInput>

        <DateInput source="release_date" />

        <ImageInput
          source="image"
          label="Album Cover"
          accept="image/*"
          format={(value) =>
            typeof value === "string"
              ? [{ src: value, title: value }]
              : value
          }
          parse={(value) =>
            value && value.rawFile ? value.rawFile : value
          }
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export default AlbumCreate;
>>>>>>> 82b2c8f04459e3acd47e68461b98cf7fa192c180
