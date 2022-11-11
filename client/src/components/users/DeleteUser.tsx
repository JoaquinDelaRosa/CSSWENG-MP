import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { User } from "./UserDetails";

export const DeleteUser = (props : {user : User, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteUser).delete({"id" : props.user.id})
            .then((response) => {
                props.observer();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
      <div>
        <button onClick={onSubmit}> Delete </button>
      </div> 
    );
}