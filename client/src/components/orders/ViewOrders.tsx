import { useEffect, useState } from "react";
import { CreateOrder } from "./CreateOrder";
import { OrderRecord } from "./OrderRecord";
import { Searchbar } from "../Searchbar";
import { isRole } from "../../utils/CheckRole";
import { TableBody, TableHead } from "../../style/TableStyle";
import { CreateButton } from "../../style/CreateButton";
import { ENDPOINTS } from "../../api/endpoints";

const searchOptions =[
        {name: "PAID",      description:"The order is paid", tag: "status: PAID"},
        {name: "UNPAID",      description:"The order is unpaid", tag: "status: UNPAID"},
        {name: "OK",      description:"The order is c/o the shop", tag: "status: OK"},
        {name: "PENDING",      description:"The order is pending payment", tag: "status: PENDING"},
        {name: "WITH BALANCE",      description:"The order has balance", tag: "status: WITH BALANCE"},
        {name: "QUOTE OR CHECK ",      description:"The order has a quote or check", tag: "status: QUOTE OR CHECK"},
        {name: "FOR LOA OR INVOICE ",      description:"The order has an LOA or an Invoice", tag: "status: FOR LOA OR INVOICE"},

        
        {name: "PERSONAL",      description:"The order has a scheduled personal appointment", tag: "type: PERSONAL"},
        {name: "WALK IN",      description:"The order is for a walk-in customer", tag: "type: WALK IN"},
        {name: "FLEET",      description:"The order is for a fleet of vehicles", tag: "type: FLEET"},
        {name: "INSURANCE ",      description:"The order for a vehicle with insurance", tag: "type: INSURANCE"},

        {name: "customer", description: "The customer corresponding to the order"},
        {name: "vehicle", description: "The vehicle corresponding to the order"},
]


const OrdersView = () => {

    const [orders, setOrders] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const [flag, setFlag] = useState(false);

    const updateView = () => {
        setFlag(!flag);
    }

    useEffect(() => {
        console.log(queryResult);
        setOrders(queryResult)
    }, [queryResult]);


    return (
        <div>
            <Searchbar path={ENDPOINTS.filterOrder} all={ENDPOINTS.orders} setData={setQueryResult} queryParser={queryParser} flag ={flag}
                options = {searchOptions}>
            <br />
            <table>
                <TableHead>
                    <tr>
                        <th> Verified </th>
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
    
                        <th hidden={isRole("VIEW")}></th>
                        <th hidden={isRole("VIEW")}></th>
                    </tr>
                </TableHead>
                <TableBody>
                    {orders.map((value, index) => {
                        return (<OrderRecord order={value} key={index } rerenderFlag={() => {setFlag(!flag)}}/>);
                    })}
                </TableBody>
            </table>
            <br />
            <CreateButton hidden={isRole("VIEW")}>
                <CreateOrder observer={updateView}/>
            </CreateButton>
            </Searchbar>

        </div>
              
    );
}

const queryParser = (q : string) => {
    const toks = q.split(',');
    const query = {
        status: "",
        type: "",
        customerName: "", 
        licensePlate: "",
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
        else if (key === "customer"){
            query.customerName = value?.trim();
        }
        else if (key == "vehicle"){
            query.licensePlate = value?.trim();
        }
    }

    return query;
}

export default OrdersView;