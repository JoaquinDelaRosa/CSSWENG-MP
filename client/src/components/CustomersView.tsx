import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
interface Customer {
    name: string,
    type: string
    company? : string
}

const CustomerRecord = (props : { customer: Customer }) => {
    return (
        <tr>
            <td> {props.customer.name} </td>
            <td> {props.customer.type} </td>
            <td> {props.customer.company} </td>
        </tr> 
     );
}

const CustomersView = () => {

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        await createAPIEndpoint(ENDPOINTS.customers).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const customerList = data.map((value: any) => {
                    let customer: Customer;
                    customer = {
                        name: value.name,
                        type: value.type,
                        company: value.company
                    };
                    return customer;
                });

                console.log(customerList);
                return customerList
            })
            .then((list) => {
                setCustomers(list);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchCustomers();
    }, [])


    return (
        <div>
            <table>
                <tbody>
                    {customers.map((value, index) => {
                        return (<CustomerRecord customer={value} key={index } />);
                    })}
                </tbody>
            </table>
        </div>      
    );
}

export default CustomersView;