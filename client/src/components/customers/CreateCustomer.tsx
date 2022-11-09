import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { CustomerRequest } from "./CustomerDetails";
import { RequestCustomer } from "./RequestCustomer";

export const CreateCustomer = (props : {observer : Function}) => {
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addCustomer).post(data)
        .then(function (response) {
            props.observer();
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