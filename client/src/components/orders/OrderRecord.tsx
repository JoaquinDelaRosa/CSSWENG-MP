import { useState, useEffect } from "react";
import { Order } from "./OrderDetails";
import { createAPIEndpoint } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { InvoiceDisplay } from "./InvoiceDisplay";
import { DateEntry } from "../base/DateEntry";
import { ExpensesDisplay } from "../expenses/ExpensesDisplay";
import { DeleteOrder } from "./DeleteOrder";
import { UpdateOrder } from "./UpdateOrders";
import { isRole } from "../../utils/CheckRole";
import { ENDPOINTS } from "../../api/endpoints";

export const OrderRecord = (props : { order: Order, rerenderFlag: Function}) => {
    const [order, setOrder] = useState<Order | null>(props.order);
    const [isVerified, setIsVerified] = useState<boolean>(props.order.verified);

    useEffect(() => {
        if (props && props.order){
            setOrder(props.order);
        } else {
            setOrder(null);
        }
    }, [props, props.order])
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.verifyOrder).post({isVerified : isVerified}, {id: props.order.id})
        .then((response) => {
            console.log("Verified");
        })
        .catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVerified])
    

    const onUpdate = () => {
        createAPIEndpoint(ENDPOINTS.getVehicle).fetch({id : props.order.id})
        .then((response) => {
            setOrder(response.data);
        });
    };

    const onDelete = () => {
        props.rerenderFlag();
    }


    if(order){
        return (
            <tr>
                <td> <input type="checkbox" defaultChecked={isVerified} onChange={(e) => setIsVerified(!isVerified)}/> </td>
                <td> {props.order.status} </td>

                <td><DateEntry date={props.order.timeIn} /></td>
                <td><DateEntry date={props.order.timeOut} /></td>

                <td> {props.order?.customer?.name.val}</td>
                <td> {props.order.type} </td>
                <td> {props.order.company} </td>
                <td> {props.order?.vehicle?.licensePlate }</td>

                <td className="detailsViewExpensesButt">
                    <InvoiceDisplay invoice={props.order?.invoice}/>
                </td>

                <td> {props.order.estimateNumber}</td>
                <td> {props.order.scopeOfWork}</td>

                <td className="detailsViewExpensesButt">
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

                <td hidden={isRole("VIEW")}> <UpdateOrder order={props.order} observer={onUpdate}/></td>
                <td hidden={isRole("VIEW")}> <DeleteOrder order={props.order} observer={onDelete}/></td>

            </tr> 
        );
    } else{
        return null;
    }
}
