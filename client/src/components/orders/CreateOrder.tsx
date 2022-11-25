import { useState } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { RequestOrder } from "./RequestOrder";

export const CreateOrder = (props : {observer : Function}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addOrder).post(data)
        .then((response) => {
            props.observer();
            setIsVisible(false);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <div>
            <ModalWrapper front={"Create"} isVisible={isVisible} setIsVisible={setIsVisible}>
                <RequestOrder setResponse={setData}/>
            </ModalWrapper> 
        </div>
        
    );
}