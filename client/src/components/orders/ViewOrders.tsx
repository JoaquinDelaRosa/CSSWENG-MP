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
            <table className="orderDiv">
                <thead>
                    <tr>
                        <th className="delCol"></th>
                        <th className="editCol"></th>
                        <th className="statusCol"> Status </th>
                        <th className="timeCol"> Time In </th>
                        <th className="timeCol"> Time Out </th>
                        <th className="customerCol"> Customer Name </th>
                        <th className="customerCol"> Customer Type </th>
                        <th className="customerCol"> Company </th>
                        <th className="othDetails"> License Plate </th>
                        <th className="othDetails"> Invoice Details </th>
                        <th className="othDetails"> Estimate Number </th>
                        <th className="othDetails"> Scope of Work </th>
                        <th className="othDetails"> Expenses </th>
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