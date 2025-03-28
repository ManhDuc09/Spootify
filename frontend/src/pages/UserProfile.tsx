import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { id } = useParams()
    return (
        <h1>User Id: {id} </h1>
    );
}
export default UserProfile