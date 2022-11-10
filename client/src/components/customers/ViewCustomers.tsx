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

    const updateView = async () => {
        fetchCustomers();
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const queryParser = (query : string) => {
        const toks = query.split(' ');
        return {
            name: toks[1].trim(),
            skip: 0,
            limit: 1000
        };
    }

    return (
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterCustomer} setData={setCustomers} queryParser={queryParser} options = {[{name: "name", description:"The name of the customer"}]}/>
            <br />
            <div className="objectView">
                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th> </th>
                            <th> </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Mobile Number </th>
                        </tr>
                    </thead>
                
                    <tbody className="tbodyDiv">
                        {customers.map((value, index) => {
                            return (<CustomerRecord customer={value} key={index } observer ={updateView}/>);
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

export default ViewCustomers;