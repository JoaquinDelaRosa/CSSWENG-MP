import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { CreateCustomer } from "./CreateCustomer";
import { Customer } from "./CustomerDetails";
import { CustomerRecord } from "./CustomerRecord";
import "../../style/TablesView.css";
import {Searchbar} from "../Searchbar";

const ViewCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const fetchCustomers = async () => {
        await createAPIEndpoint(ENDPOINTS.customers).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const customerList = data.map((value: any) => {
                    let customer: Customer = value;
                    return customer;
                });
                
                return customerList
            })
            .then((list) => {
                setCustomers(list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const updateView = () => {
        fetchCustomers();
    }

    useEffect(() => { 
        setCustomers(queryResult);
    }, [queryResult]);

    const sortAlphabetically = (isAsc: Boolean ) => {
        if(isAsc){
            customers.sort((a : Customer, b : Customer) => {
                let fa = a.name.val.toLowerCase(),
                    fb = b.name.val.toLowerCase();

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
                let fa = a.name.val.toLowerCase(),
                    fb = b.name.val.toLowerCase();

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
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterCustomer} setData={setQueryResult} queryParser={queryParser} 
                options = {[
                    {name: "name", description:"The name of the customer"},
                    {name: "email", description: "The email of the customer"},
                    {name: "mobileNumber", description: "The mobile number of the customer"}
                ]}/>
            <br />
            <div className="objectView">
                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th> </th>
                            <th> </th>
                            <th> Name 
                                <button onClick={() => {
                                    sortAlphabetically(true);
                                }}>▲</button>

                                <button onClick={() => {
                                    sortAlphabetically(false);
                                }}>▼</button> 
                            </th>
                            <th> Email </th>
                            <th> Mobile Number </th>
                        </tr>
                    </thead>
                
                    <tbody className="tbodyDiv">
                        {customers.map((value, index) => {
                            return (<CustomerRecord customer={value} key={index }/>);
                        })}
                    </tbody>
                </table>
                <br />
                <ModalWrapper front={"Create Customer"}> 
                    <CreateCustomer observer={updateView}/>
                </ModalWrapper>
            </div>
        </div>      
    );
}


const queryParser = (q : string) => {
    const toks = q.split(':');
    const query = {
        name: "",
        skip: 0,
        limit: 1000,
        email: "",
        mobileNumber: "",
    };

    for(let i = 0; i < toks.length; ++i){
        const token = toks[i].trim();
        if (token === "name"){
            query.name = toks[i + 1]?.trim();
        }
        else if (token === "mobileNumber"){
            query.mobileNumber = toks[i + 1]?.trim();
        }
        else if (token === "email"){
            query.email = toks[i + 1]?.trim();
        }
        ++i;
    }

    return query;
}



export default ViewCustomers;