import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { RequestVehicle } from "./RequestVehicle";

export const CreateVehicle = (props : {observer : Function}) => {
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addVehicle).post(data)
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    };
        
    return (
        <div>
            <ModalWrapper front={"Create Vehicle"}>
                <RequestVehicle setResponse={setData}/>
            </ModalWrapper>
        </div>
    )
}