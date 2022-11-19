import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { RequestCustomer } from "./RequestCustomer";

export const CreateCustomer = (props : {observer : Function}) => {

    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addCustomer).post(data)
        .then(function (response) {
            props.observer(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <ModalWrapper front={"Create Customer"}> 
            <RequestCustomer setResponse={setData}/>
        </ModalWrapper>
    );
}