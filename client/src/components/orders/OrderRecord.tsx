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
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (props && props.order){
            setOrder(props.order);
        } else {
            setOrder(null);
        }
    }, [props, props.order])

    const onVerify = (val : boolean) => {
        createAPIEndpoint(ENDPOINTS.verifyOrder).post({isVerified : props.order.isVerified}, {id: props.order.id})
        .then((response) => {
            console.log("Verified")
        })
        .catch((error) => {
            console.log(error)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    

    const onUpdate = () => {
        createAPIEndpoint(ENDPOINTS.getOrder).fetch({id : props.order.id})
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
                <td hidden={isRole("VIEW") || isRole("VIEW_EDIT")}> 
                    <input type="checkbox" 
                        key ={order.id} 
                        defaultChecked={order.isVerified} 
                        onChange={(e) => {
                            onVerify(!order.isVerified);
                        }
                    }/> 
                </td>
                <td> {order.status} </td>

                <td><DateEntry date={order?.timeIn} /></td>
                <td><DateEntry date={order?.timeOut} /></td>

                <td> {order?.customer?.name?.val}</td>
                <td> {order?.type} </td>
                <td> {order?.vehicle?.licensePlate }</td>

                <td>
                    <InvoiceDisplay invoice={order?.invoice}/>
                </td>

                <td> {order?.estimateNumber}</td>
                <td> {order?.scopeOfWork}</td>
                <td>
                    <p> 
                        {"Total Expenses: " } 
                     
                    <>
                    {
                        order?.expenses.reduce(
                            (x, y) => {
                                return x + y.amount.valueOf();
                            }, 0).toFixed(2)
                    }
                    </>
                    </p>
                    <ModalWrapper front={"..."} isVisible={isVisible} setIsVisible={setIsVisible}>
                        <ExpensesDisplay expenses={order?.expenses}/>
                    </ModalWrapper> 
                       
                </td>

                <td hidden={isRole("VIEW")}> <UpdateOrder order={order} observer={onUpdate}/></td>
                <td hidden={isRole("VIEW")}> <DeleteOrder order={order} observer={onDelete}/></td>

            </tr> 
        );
    } else{
        return null;
    }
}
