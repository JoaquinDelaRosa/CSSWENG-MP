import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { Customer, CustomerRequest } from "./CustomerDetails";
import { RequestCustomer } from "./RequestCustomer";


export const UpdateCustomer = (props : {customer : Customer, observer : Function}) => {
    const [data, setData] = useState<CustomerRequest>();
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.updateCustomer).post(data, {id: props.customer.id})
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <div>
          <ModalWrapper front={"Edit"}>
            <RequestCustomer setResponse={setData} 
                default={{
                    firstName: props.customer.name.firstName, 
                    lastName: props.customer.name.lastName, 
                    ...props.customer
                }}/>
          </ModalWrapper>
        </div>
    )
}