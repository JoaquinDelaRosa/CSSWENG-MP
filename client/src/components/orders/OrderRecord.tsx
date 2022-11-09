import { Order } from "./OrderDetails";

const MONTHS = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const DateEntry = (props: { date: string }) => {
    const d: Date = new Date(props.date);

    return (
        <>
            <td> {MONTHS[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear()}</td>
        </>
    );
}


export const OrderRecord = (props : { order: Order}) => {
    return (
        <tr>
            <td> {props.order.status} </td>

            <DateEntry date={props.order.timeIn} />
            <DateEntry date={props.order.timeOut} />

            <td> {props.order.customerDetails?.name.val}</td>
            <td> {props.order.type} </td>
            <td> {props.order.vehicleDetails?.licensePlate }</td>

            <td> {props.order.estimateNumber}</td>
            <td> {props.order.scopeOfWork}</td>

        </tr> 
     );
}
