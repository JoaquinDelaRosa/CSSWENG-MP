import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { User } from "./UserDetails";

export const DeleteUser = (props : {user : User, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteUser).delete({"id" : props.user.id})
            .then((response) => {
                props.observer();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
      <div className="deleteBtn">
        <button onClick={onSubmit}><i className="deleteIcon"></i></button>
      </div> 
    );
}