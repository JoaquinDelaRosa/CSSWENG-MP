import { createAPIEndpoint, ENDPOINTS } from "../../api";
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
        <div>
            <RequestCustomer setResponse={setData}/>
        </div> 
    );
}