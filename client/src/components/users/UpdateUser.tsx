import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { CustomerRequest } from "../customers/CustomerDetails";
import { ModalWrapper } from "../ModalBase";
import { RequestUser } from "./RequestUser";
import { User } from "./UserDetails";

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
