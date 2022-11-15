import { useState, useEffect } from "react";
import { Order, OrderRequest } from "./OrderDetails";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { RequestOrder } from "./RequestOrder";
import { InvoiceDisplay } from "./InvoiceDisplay";
import { DateEntry } from "../base/DateEntry";
import { ExpensesDisplay } from "../expenses/ExpensesDisplay";

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
                vehicle: props.order.vehicle.id,
                expenses: props.order.expenses,
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

            <td><DateEntry date={props.order.timeIn} /></td>
            <td><DateEntry date={props.order.timeOut} /></td>

            <td> {props.order?.customer?.name.val}</td>
            <td> {props.order.type} </td>
            <td> {props.order.company} </td>
            <td> {props.order?.vehicle?.licensePlate }</td>

            <td>
                <InvoiceDisplay invoice={props.order?.invoice}/>
            </td>

            <td> {props.order.estimateNumber}</td>
            <td> {props.order.scopeOfWork}</td>
            <td>
                <p> 
                    {"Total Expenses: " } 
                </p> 
                <>
                {
                    props.order.expenses.reduce(
                        (x, y) => {
                            return x + y.amount.valueOf();
                        }, 0).toFixed(2)
                }
                </>
                <ModalWrapper front={"View Expenses"}>
                    <ExpensesDisplay expenses={props.order.expenses}/>
                </ModalWrapper>    
            </td>

        </tr> 
     );
}
