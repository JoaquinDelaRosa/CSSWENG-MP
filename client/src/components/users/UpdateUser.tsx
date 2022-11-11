import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { User, UserRequest } from "./UserDetails";
import { RequestUser } from "./RequestUser";
import { CustomerRequest } from "../customers/CustomerDetails";

export const UpdateUser = (props : {user : User, observer : Function}) => {
    const [data, setData] = useState<CustomerRequest>();
    
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
        <div>
          <ModalWrapper front={"Edit"}>
            <RequestUser setResponse={setData} default={props.user}/>
          </ModalWrapper>
        </div>
    )
}