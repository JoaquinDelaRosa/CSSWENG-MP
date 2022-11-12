import { Customer } from "./CustomerDetails";
import "../../style/TableButtons.css";
import { DeleteCustomer } from "./DeleteCustomer";
import { UpdateCustomer } from "./UpdateCustomer";
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";


export const CustomerRecord = (props : { customer: Customer}) => {
    const [customer, setCustomer] = useState<Customer | null>(props.customer);

    useEffect(() => {
        if (props && props.customer){
            setCustomer(props.customer);
        } else {
            setCustomer(null);
        }
    }, [props, props.customer])

    const onUpdate = () => {
        createAPIEndpoint(ENDPOINTS.getCustomer).fetch({id : props.customer.id})
        .then((response) => {
            setCustomer(response.data);
        })
    };

    const onDelete = () => {
        setCustomer(null);
    }

    if (customer) {
        return ( 
            <tr>
                <td> {customer?.name.val} </td>
                <td> {customer?.email} </td>
                <td> {customer?.mobileNumber} </td>
                <td> <UpdateCustomer customer={props.customer} observer={onUpdate}/></td>
                <td> <DeleteCustomer customer={props.customer} observer={onDelete}/></td>
            </tr> 
        );
    } else {
        return null;
    }
}