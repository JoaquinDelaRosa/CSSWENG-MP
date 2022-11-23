import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { EditButton } from "../../style/EditButton";
import { ModalWrapper } from "../base/ModalBase";
import { RequestUser } from "./RequestUser";
import { User } from "./UserDetails";

export const UpdateUser = (props : {user : User, observer : Function}) => {
    const [data, setData] = useState<User>();
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.updateUser).post(data, {id: props.user.id})
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <EditButton>
          <ModalWrapper front={"Edit"}>
            <RequestUser setResponse={setData} default={props.user}/>
          </ModalWrapper>
        </EditButton>
    )
}
