import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { EditButton } from "../../style/EditButton";
import { isRole } from "../../utils/CheckRole";
import { ModalWrapper } from "../base/ModalBase";
import { RequestUser } from "./RequestUser";
import { User } from "./UserDetails";

export const UpdateUser = (props : {user : User, observer : Function}) => {
    const [data, setData] = useState<User>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    
    useEffect(() => {
        if (isRole("VIEW")) 
            return;
        createAPIEndpoint(ENDPOINTS.updateUser).post(data, {id: props.user.id})
        .then(function (response) {
            props.observer();
            setIsVisible(false);
        })
        .catch(function (error) {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <EditButton>
          <ModalWrapper front={"Edit"} isVisible = {isVisible} setIsVisible ={setIsVisible}>
            <RequestUser setResponse={setData} default={props.user}/>
          </ModalWrapper>
        </EditButton>
    )
}
