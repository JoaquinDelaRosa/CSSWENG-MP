import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { Customer } from "./CustomerDetails";
import { CustomerRecord } from "./CustomerRecord";

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
                        return (<CustomerRecord customer={value} key={index } />);
                    })}
                </tbody>
            </table>
        </div>      
    );
}

export default ViewCustomers;