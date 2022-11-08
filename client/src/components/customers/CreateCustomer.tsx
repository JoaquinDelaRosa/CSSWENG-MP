import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { CustomerRequest } from "./CustomerDetails";
import { RequestCustomer } from "./RequestCustomer";

export const CreateCustomer = (props : {observer : Function}) => {
    const [data, setData] = useState<CustomerRequest>()

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.addCustomer).post(data)
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [data, props])

    return (
        <div>
            <RequestCustomer setResponse={setData}/>
        </div> 
    );
}