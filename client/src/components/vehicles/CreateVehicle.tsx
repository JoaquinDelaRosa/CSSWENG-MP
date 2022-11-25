import { useState } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { RequestVehicle } from "./RequestVehicle";

export const CreateVehicle = (props : {observer : Function}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addVehicle).post(data)
        .then(function (response) {
            props.observer();
            setIsVisible(false);
        })
        .catch(function (error) {
            console.log(error);
        })
    };
        
    
    return (
        <ModalWrapper front={"Create Vehicle"} isVisible={isVisible} setIsVisible={setIsVisible}>
            <div>
                <RequestVehicle setResponse={setData}/>
            </div>
        </ModalWrapper>
    )
}