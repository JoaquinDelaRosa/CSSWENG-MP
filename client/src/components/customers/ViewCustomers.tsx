import { useEffect, useState } from "react";
import { CreateCustomer } from "./CreateCustomer";
import { Customer } from "./CustomerDetails";
import { CustomerRecord } from "./CustomerRecord";
import {ViewHandler} from "../view/ViewHandler";
import { isRole } from "../../utils/CheckRole";
import { OptionButton } from "../../style/SearchbarStyle";
import { TableBody, TableHead } from "../../style/TableStyle";
import { CreateButton } from "../../style/CreateButton";
import { ENDPOINTS } from "../../api/endpoints";


const ViewCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const [flag, setFlag] = useState(false);

    const updateView = () => {
        setFlag(!flag);
    }

    useEffect(() => { 
        setCustomers(queryResult);
    }, [queryResult]);

    const sortAlphabetically = (isAsc: Boolean ) => {
        if(isAsc){
            customers.sort((a : Customer, b : Customer) => {
                let fa = a.name.val.toLowerCase();
                let fb = b.name.val.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
        }
        else{
            customers.sort((a : Customer, b : Customer) => {
                let fa = a.name.val.toLowerCase();
                let fb = b.name.val.toLowerCase();

                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            })
        }

        setQueryResult([...customers]);
    };

    return (
        <div>
            <ViewHandler path={ENDPOINTS.filterCustomer} all={ENDPOINTS.customers} setData={setQueryResult} queryParser={queryParser} flag ={flag}
                options = {[
                    {name: "name", description:"The name of the customer"},
                    {name: "email", description: "The email of the customer"},
                    {name: "mobileNumber", description: "The mobile number of the customer"},
                    {name: "company", description: "The company of the customer"},
                    {name: "insurance", description: "The insurance company of the customer"}
                ]}>
            <br />
      
                <table>
                    <TableHead>
                        <tr>
                            <th> Name 
                                <OptionButton onClick={() => {
                                    sortAlphabetically(true);
                                }}>▲</OptionButton>
                                <OptionButton onClick={() => {
                                    sortAlphabetically(false);
                                }}>▼</OptionButton>
                            </th>
                            <th> Email </th>
                            <th> Mobile Number </th>
                            <th> Company </th>
                            <th> Insurance </th>
                            <th> Remarks </th>

                            <th hidden={isRole("VIEW")}></th>
                            <th hidden={isRole("VIEW")}></th>
                        </tr>
                    </TableHead>
                
                    <TableBody>
                        {customers.map((value, index) => {
                            return (<CustomerRecord customer={value} key={index} rerenderFlag={() => {setFlag(!flag)}}/>);
                        })}
                    </TableBody>
                </table>
                <br />
                <div hidden={isRole("VIEW")}>
                    <CreateButton hidden={isRole("VIEW")}>
                        <CreateCustomer observer={updateView}/>
                    </CreateButton>
                </div>
           
            </ViewHandler>
        </div>      
    );
}


const queryParser = (q : string) => {
    const toks = q.split(',');
    const query = {
        name: "",
        skip: 0,
        limit: 1000,
        email: "",
        mobileNumber: "",
        company: "",
        insurance: ""
    };

    for(let i = 0; i < toks.length; ++i){
        const subtoks = toks[i].split(":");
        const key = subtoks[0].trim();
        const value = subtoks[1];

        if (key === "name"){
            query.name = value?.trim();
        }
        else if (key === "mobileNumber"){
            query.mobileNumber = value?.trim();
        }
        else if (key === "email"){
            query.email = value?.trim();
        }
        else if (key === "company"){
            query.company = value?.trim();
        }
        else if (key === "insurance"){
            query.insurance = value?.trim();
        }
    }

    return query;
}



export default ViewCustomers;