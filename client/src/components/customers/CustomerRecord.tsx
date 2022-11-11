import { Customer } from "./CustomerDetails";
import "../../style/TableButtons.css";
import { DeleteCustomer } from "./DeleteCustomer";
import { UpdateCustomer } from "./UpdateCustomer";
import { useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";


export const CustomerRecord = (props : { customer: Customer}) => {
    const [customer, setCustomer] = useState<Customer | null>(props.customer);

    const observer = () => {
        createAPIEndpoint(ENDPOINTS.getCustomer).fetch({id : props.customer.id})
        .then((response) => {
            setCustomer(response.data);
            console.log(customer);
        })
    };

    const onDelete = () => {
        setCustomer(null);
    }

    if (customer !== null) {
        return ( 
            <tr>
                <td> <DeleteCustomer customer={props.customer} observer={onDelete}/></td>
                <td> <UpdateCustomer customer={props.customer} observer={observer}/></td>
                <td> {customer?.name.val} </td>
                <td> {customer?.email} </td>
                <td> {customer?.mobileNumber} </td>
            </tr> 
        );
    } else {
        return null;
    }
}