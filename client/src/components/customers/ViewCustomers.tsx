import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import AddCustomer from "./AddCustomer";
import { Customer } from "./CustomerDetails";
import DeleteCustomer from "./DeleteCustomer";
import UpdateCustomer from "./UpdateCustomer";


const CustomerRecord = (props : { customer: Customer }) => {
    return (
        <tr>
            <td> {props.customer.name} </td>
            <td> {props.customer.type} </td>
            <td> {props.customer.company} </td>
        </tr> 
     );
}

const ViewCustomers = () => {

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
        <div>
            <table>
                <thead>
                    <th> Name </th>
                    <th> Type </th>
                    <th> Company </th>
                </thead>

                <tbody>
                    {customers.map((value, index) => {
                        return (<CustomerRecord customer={value} key={index } />);
                    })}
                </tbody>
            </table>
            <AddCustomer />
            <UpdateCustomer />
            <DeleteCustomer />
        </div>      
    );
}

export default ViewCustomers;