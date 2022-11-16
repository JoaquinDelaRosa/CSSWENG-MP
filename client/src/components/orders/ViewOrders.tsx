import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { CreateOrder } from "./CreateOrder";
import { Order } from "./OrderDetails";
import { OrderRecord } from "./OrderRecord";
import "../../style/Hometables.css";
import { Searchbar } from "../Searchbar";

const OrdersView = () => {

    const [orders, setOrders] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const [flag, setFlag] = useState(false);

    const updateView = () => {
        setFlag(!flag);
    }

    useEffect(() => {
        setOrders(queryResult)
    }, [queryResult]);


    return (
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterOrder} all={ENDPOINTS.orders} setData={setQueryResult} queryParser={queryParser} flag ={flag}
                options = {[
                    {name: "status", description:"The status of the order"},
                    {name: "type", description: "The type of the customer"},
                ]}>
            <div className="objectView">
            <br />
            <table className="tableDiv">
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
                        return (<OrderRecord order={value} key={index } rerenderFlag={() => {setFlag(!flag)}}/>);
                    })}
                </tbody>
            </table>
            <br />
            <div className="createBtn">
                    <CreateOrder observer={updateView}/>
            </div>
            
            </div>
            </Searchbar>
        </div>
              
    );
}

const queryParser = (q : string) => {
    const toks = q.split(',');
    const query = {
        status: "",
        type: "",
        skip: 0,
        limit: 1000
    };

    for(let i = 0; i < toks.length; ++i){
        const subtoks = toks[i].split(":");
        const key = subtoks[0].trim();
        const value = subtoks[1];

        if (key === "status"){
            query.status = value?.trim();
        }
        else if (key === "type"){
            query.type = value?.trim();
        }
    }

    return query;
}

export default OrdersView;