import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import AddOrder from "./AddOrder";
import DeleteOrder from "./DeleteOrder";
import { Order } from "./OrderDetails";
import UpdateOrder from "./UpdateOrder";

const MONTHS = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const DateEntry = (props: { date: string }) => {
    const d: Date = new Date(props.date);

    return (
        <>
            <td> {MONTHS[d.getMonth()]}</td>
            <td> {d.getDate()}</td>
            <td> {d.getFullYear()}</td> 
        </>
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
                <thead>
                    <th> ID </th>
                    <th> Status </th>
                    <th> Time In Month </th>
                    <th> Time In Day </th>
                    <th> Time In Year </th>
                    <th> Time Out Month </th>
                    <th> Time Out Day </th>
                    <th> Time Out Year </th>
                    <th> Customer ID </th>
                    <th> Vehicle ID </th>
                    <th> Invoice ID </th>
                    <th> Estimate Number </th>
                    <th> Scope of Work </th>
                    <th> Estimate </th>
                </thead>
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