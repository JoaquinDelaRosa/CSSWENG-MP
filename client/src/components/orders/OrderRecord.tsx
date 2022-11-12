import { useState, useEffect } from "react";
import { Order, OrderRequest } from "./OrderDetails";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { RequestOrder } from "./RequestOrder";

const MONTHS = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const DateEntry = (props: { date: string }) => {
    const d: Date = new Date(props.date);

    return (
        <>
            <td> {d.valueOf() !== 0 ? MONTHS[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() : ""}</td>
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
      <div className="deleteBtn">
        <button onClick={onSubmit}><i className="deleteIcon"></i> Delete </button>
      </div> 
    );
}

export const UpdateOrder = (props : {order : Order, observer : Function}) => {
    const [data, setData] = useState<OrderRequest>();
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.updateOrder).post(data, {id: props.order.id})
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
            <RequestOrder setResponse={setData} default={{
                ...props.order, 
                timeIn: new Date(props.order.timeIn), 
                timeOut: new Date(props.order.timeOut),
                customer : props.order.customer.id,
                vehicle: props.order.vehicle.id
            }}/>
          </ModalWrapper>
        </div>
    )
}

export const OrderRecord = (props : { order: Order, observer: Function }) => {
    return (
        <tr>
            <td> <DeleteOrder order={props.order} observer={props.observer}/></td>
            <td> <UpdateOrder order={props.order} observer={props.observer}/></td>
            <td> {props.order.status} </td>

            <DateEntry date={props.order.timeIn} />
            <DateEntry date={props.order.timeOut} />

            <td> {props.order?.customer?.name.val}</td>
            <td> {props.order.type} </td>
            <td> {props.order.company} </td>
            <td> {props.order?.vehicle?.licensePlate }</td>

            <td> {"Sample text"} </td>
            <td> {props.order.estimateNumber}</td>
            <td> {props.order.scopeOfWork}</td>
            <td> {"This is sample expenses"} </td>

        </tr> 
     );
}
