import { useState } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { RequestUser } from "./RequestUser";

export const CreateUser = (props : {observer : Function}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addUser).post(data)
        .then(function (response) {
            props.observer();
            setIsVisible(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <ModalWrapper front={"Create User"} isVisible={isVisible} setIsVisible={setIsVisible}> 
            <div>
                <RequestUser setResponse={setData}/>
            </div> 
        </ModalWrapper> 
    );
}