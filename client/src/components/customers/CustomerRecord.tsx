import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { Customer, CustomerRequest } from "./CustomerDetails";
import { RequestCustomer } from "./RequestCustomer";
import "../../style/TableButtons.css";

export const DeleteCustomer = (props : {customer : Customer, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteCustomer).delete({"id" : props.customer.id})
            .then((response) => {
                props.observer();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
      <div className="deleteButton">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button onClick={onSubmit}><i className="fa fa-close"></i></button>
      </div> 
    );
}

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
    }, [data])

    return (
        <div>
          <ModalWrapper front={
            <>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div><i className="fa fa-close"></i></div>
            </>
          }>
            <RequestCustomer setResponse={setData} default={{firstName: props.customer.name.firstName, lastName: props.customer.name.lastName, ...props.customer}}/>
          </ModalWrapper>
        </div>
    )
}

export const CustomerRecord = (props : { customer: Customer , observer : Function}) => {
    return (
        
            <tr>
            <td> <DeleteCustomer customer={props.customer} observer={props.observer}/></td>
            <td> <UpdateCustomer customer={props.customer} observer={props.observer}/></td>
            <td> {props.customer.name.val} </td>
            <td> {props.customer.email} </td>
            <td> {props.customer.mobileNumber} </td>
            </tr> 
     );
}