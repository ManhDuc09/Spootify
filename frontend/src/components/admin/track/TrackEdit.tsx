import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ImageInput,
  ImageField,
  FileInput,
  FileField,
  useNotify,
  ReferenceInput,
  SelectInput,
  DateInput,
} from "react-admin";
import axios from "axios";

const TrackEdit = () => {
  const notify = useNotify();

  const uploadFileToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload-image/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data.url;
    } catch (error) {
      notify("File upload failed", { type: "error" });
      throw error;
    }
  };

  return (
    <Edit
        transform={async (data) => {
            delete data.artists;
            console.log("cover_url at transform:", data.cover_url);
            if (
            data.audio_url &&
            typeof data.audio_url === "object" &&
            "rawFile" in data.audio_url
            ) {
            data.audio_url = await uploadFileToS3(data.audio_url.rawFile);
            }
            if (
            data.cover_url &&
            typeof data.cover_url === "object" &&
            "rawFile" in data.cover_url
            ) {
            data.cover_url = await uploadFileToS3(data.cover_url.rawFile);
            } else if (data.cover_url instanceof File) {
            data.cover_url = await uploadFileToS3(data.cover_url);
            }


            return data;
        }}
        >
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" />

        <ReferenceArrayInput source="artist_ids" reference="artists">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
       
        <FileInput source="audio_url" label="Music File" accept="audio/*" multiple={false}>
          <FileField source="src" title="title" />
        </FileInput>

        <DateInput source="release_date" />
        <ImageInput
        source="cover_url"
        label="Cover Image"
        accept="image/*"
        format={(value) =>
            typeof value === "string"
            ? [{ src: value, title: value }]
            : value
        }
        parse={value => (value && value.rawFile ? value.rawFile : value)}
        >
        <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="duration" />
         <ReferenceInput source="album_id" reference="albums">
                <SelectInput optionText="name" />
        </ReferenceInput>

      </SimpleForm>
    </Edit>
  );
};

export default TrackEdit;
