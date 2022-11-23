import { Customer } from "./CustomerDetails";
import { DeleteCustomer } from "./DeleteCustomer";
import { UpdateCustomer } from "./UpdateCustomer";
import { useEffect, useState } from "react";
import { createAPIEndpoint } from "../../api";
import { isRole } from "../../utils/CheckRole";
import { ENDPOINTS } from "../../api/endpoints";


export const CustomerRecord = (props : { customer: Customer, rerenderFlag: Function}) => {
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
        });
    };

    const onDelete = () => {
        props.rerenderFlag();
    }

    if (customer) {
        return ( 
            <tr>
                <td> {customer?.name.val} </td>
                <td> {customer?.email} </td>
                <td> {customer?.mobileNumber} </td>
                <td> {customer?.company} </td>
                <td> {customer?.insurance} </td>
                <td> {customer?.remarks} </td>
                <td hidden={isRole("VIEW")}> <UpdateCustomer customer={customer} observer={onUpdate}/></td>
                <td hidden={isRole("VIEW")}> <DeleteCustomer customer={customer} observer={onDelete}/></td>
            </tr> 
        );
    } else {
        return null;
    }
}