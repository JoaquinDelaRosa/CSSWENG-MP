import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { RequestOrder } from "./RequestOrder";

export const CreateOrder = (props : {observer : Function}) => {
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addOrder).post(data)
        .then(function (response) {
            console.log(response);
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <div>
            <ModalWrapper front={"Create"}>
                <RequestOrder setResponse={setData}/>
            </ModalWrapper> 
        </div>
        
    );
}