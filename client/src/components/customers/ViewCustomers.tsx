import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { CreateCustomer } from "./CreateCustomer";
import { Customer } from "./CustomerDetails";
import { CustomerRecord } from "./CustomerRecord";

const ViewCustomers = () => {

    const [customers, setCustomers] = useState([]);

    const location = useLocation();

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
                console.log(list);
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

    return (
        <div className="objectView">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th> </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Mobile Number </th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((value, index) => {
                        return (<CustomerRecord customer={value} key={index } observer ={updateView}/>);
                    })}
                </tbody>
            </table>

            
            <CreateCustomer observer = {updateView}/>
        </div>      
    );
}

export default ViewCustomers;