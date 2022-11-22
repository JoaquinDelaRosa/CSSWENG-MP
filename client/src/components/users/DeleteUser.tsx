import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { DeleteContainer, DelIcon } from "../../style/DeleteButton";
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
      <DeleteContainer>
            <button onClick={onSubmit}><DelIcon></DelIcon> </button>
      </DeleteContainer>
    );
}