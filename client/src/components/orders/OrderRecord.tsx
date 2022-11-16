import { useState, useEffect } from "react";
import { Order, OrderRequest } from "./OrderDetails";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { RequestOrder } from "./RequestOrder";
import { InvoiceDisplay } from "./InvoiceDisplay";
import { DateEntry } from "../base/DateEntry";
import { ExpensesDisplay } from "../expenses/ExpensesDisplay";
import { DeleteOrder } from "./DeleteOrder";
import { UpdateOrder } from "./UpdateOrders";

export const OrderRecord = (props : { order: Order, rerenderFlag: Function}) => {
    const [order, setOrder] = useState<Order | null>(props.order);

    useEffect(() => {
        if (props && props.order){
            setOrder(props.order);
        } else {
            setOrder(null);
        }
    }, [props, props.order])

    const onUpdate = () => {
        createAPIEndpoint(ENDPOINTS.getVehicle).fetch({id : props.order.id})
        .then((response) => {
            setOrder(response.data);
        })
    };

    const onDelete = () => {
        props.rerenderFlag();
    }


    if(order){
        return (
            <tr>
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
                     
                    <>
                    {
                        props.order.expenses.reduce(
                            (x, y) => {
                                return x + y.amount.valueOf();
                            }, 0).toFixed(2)
                    }
                    </>
                    </p>
                    <ModalWrapper front={"View Expenses"}>
                        <ExpensesDisplay expenses={props.order.expenses}/>
                    </ModalWrapper> 
                       
                </td>

                <td> <UpdateOrder order={props.order} observer={onUpdate}/></td>
                <td> <DeleteOrder order={props.order} observer={onDelete}/></td>

            </tr> 
        );
    } else{
        return null;
    }
}
