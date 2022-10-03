import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { makeName } from "../utils/PersonName";

enum CustomerType {
    PERSONAL,
    WALK_IN,
    FLEET,
    INSURANCE,
    OTHER
};

const CustomerTypeToString = (type: CustomerType): string => {
    switch (type) {
        case CustomerType.PERSONAL: return "Personal";
        case CustomerType.WALK_IN: return "Walk In";
        case CustomerType.FLEET: return "Fleet";
        case CustomerType.INSURANCE: return "Insurance";
        case CustomerType.OTHER: return "Other";
    }
    return " "
}

interface Customer {
    name: string,
    type: CustomerType
    company? : string
}

const CustomerRecord = (props : { customer: Customer }) => {
    return (
        <tr>
            <td> {props.customer.name} </td>
            <td> {CustomerTypeToString(props.customer.type)} </td>
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
                        name: makeName(value.name),
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