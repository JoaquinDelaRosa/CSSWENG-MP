import { Order } from "./OrderDetails";
import { createAPIEndpoint, ENDPOINTS } from "../../api";

const MONTHS = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const DateEntry = (props: { date: string }) => {
    const d: Date = new Date(props.date);

    return (
        <>
            <td> {MONTHS[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear()}</td>
        </>
    );
}

export const DeleteOrder = (props : {order : Order, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteOrder).delete({"id" : props.order.id})
            .then((response) => {
                props.observer();
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

export const OrderRecord = (props : { order: Order, observer: Function }) => {
    return (
        <tr>
            <td> <DeleteOrder order={props.order} observer={props.observer}/></td>
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
