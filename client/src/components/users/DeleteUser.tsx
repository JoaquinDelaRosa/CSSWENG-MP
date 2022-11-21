import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { DeleteContainer } from "../../style/DeleteButton";
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
      <DeleteContainer>
        <button onClick={onSubmit}><i></i></button>
      </DeleteContainer> 
    );
}