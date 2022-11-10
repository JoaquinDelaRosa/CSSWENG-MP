import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { CreateOrder } from "./CreateOrder";
import { Order } from "./OrderDetails";
import { OrderRecord } from "./OrderRecord";
import "../../style/Hometables.css";

const OrdersView = () => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        await createAPIEndpoint(ENDPOINTS.orders).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const orderList = data.map((value: any) => {
                    const order: Order = value;
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

    
    const updateView = async () => {
        fetchOrders();
    }


    return (
        <div className="FullPage">
            <div className="objectView">
            <br />
            <table className="tableDiv">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th> Status </th>
                        <th> Time In </th>
                        <th> Time Out </th>
                        <th> Customer Name </th>
                        <th> Customer Type </th>
                        <th> Company </th>
                        <th> License Plate </th>
                        <th> Invoice Details </th>
                        <th> Estimate Number </th>
                        <th> Scope of Work </th>
                        <th> Expenses </th>
                    </tr>
                </thead>
                <tbody className="tbodyDiv">
                    {orders.map((value, index) => {
                        return (<OrderRecord order={value} key={index } observer={updateView}/>);
                    })}
                </tbody>
            </table>
            <br />
            <ModalWrapper front={"Create Order"}>
                <CreateOrder observer={updateView}/>
            </ModalWrapper>
            </div>
        </div>
              
    );
}

export default OrdersView;