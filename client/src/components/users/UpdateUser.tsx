import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { CustomerRequest } from "../customers/CustomerDetails";
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
    }, [data])

    return (
        <div>
          <ModalWrapper front={"Edit"}>
            <RequestUser setResponse={setData} default={props.user}/>
          </ModalWrapper>
        </div>
    )
}
