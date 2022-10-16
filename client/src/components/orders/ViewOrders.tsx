import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import AddOrder from "./AddOrder";
import DeleteOrder from "./DeleteOrder";
import { Order } from "./OrderDetails";
import UpdateOrder from "./UpdateOrder";

const DateEntry = (props: { date: Date }) => {
    return (
        <div>
            <td> {props.date.getMonth() }</td>
            <td> {props.date.getDay() }</td>
            <td> {props.date.getFullYear()}</td>
        </div>
    );
}

const OrderRecord = (props : { order: Order}) => {
    return (
        <tr>
            <td> {props.order.orderId} </td>
            <td> {props.order.status} </td>

            <DateEntry date={props.order.timeIn} />
            <DateEntry date={props.order.timeOut} />

            <td> {props.order.customerId }</td>
            <td> {props.order.vehicleId }</td>
            <td> {props.order.invoiceId}</td>

            <td> {props.order.estimateNumber}</td>
            <td> {props.order.scopeOfWork }</td>
            <td> {props.order.expenses }</td>
        </tr> 
     );
}

const ViewOrders = () => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        await createAPIEndpoint(ENDPOINTS.orders).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const orderList = data.map((value: any) => {
                    let order: Order;
                    order = {
                        orderId: value.orderId,
                        status: value.status,
                        timeIn: value.timeIn,
                        timeOut: value.timeOut,
                        customerId: value.customerId,
                        vehicleId: value.vehicleId,
                        invoiceId: value.invoiceId,
                        estimateNumber: value.estimateNumber,
                        scopeOfWork: value.scopeOfWork,
                        expenses: value.expenses
                    };
                    return order;
                });

                return orderList;
            })
            .then((list) => {
                setOrders(list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, []);


    return (
        <div>
            <table>
                <tbody>
                    {orders.map((value, index) => {
                        return (<OrderRecord order={value} key={index } />);
                    })}
                </tbody>
            </table>
            <AddOrder />
            <UpdateOrder />
            <DeleteOrder />
        </div>      
    );
}

export default ViewOrders;