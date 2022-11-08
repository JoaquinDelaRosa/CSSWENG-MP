import { Customer } from "./CustomerDetails";

export const CustomerRecord = (props : { customer: Customer }) => {
    return (
        <tr>
            <td></td>
            <td></td>
            <td> {props.customer.name} </td>
            <td> {props.customer.email} </td>
            <td> {props.customer.mobileNumber} </td>
        </tr> 
     );
}