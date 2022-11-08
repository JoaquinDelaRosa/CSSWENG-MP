import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { Customer } from "./CustomerDetails";

export const DeleteCustomer = (props : {customer : Customer}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteCustomer).delete({"id" : props.customer.id})
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
      <div>
        <button onClick={onSubmit}> Delete </button>
      </div> 
    );
}

export const CustomerRecord = (props : { customer: Customer }) => {
    return (
        <tr>
            <td> <DeleteCustomer customer={props.customer}/></td>
            <td></td>
            <td> {props.customer.name} </td>
            <td> {props.customer.email} </td>
            <td> {props.customer.mobileNumber} </td>
        </tr> 
     );
}