import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import AddInvoice from "./AddInvoice";
import DeleteInvoice from "./DeleteInvoice";
import { Invoice } from "./InvoiceDetails";
import UpdateInvoice from "./UpdateInvoice";


const InvoiceRecord = (props : { invoice: Invoice}) => {
    return (
        <tr>
            <td> {props.invoice.agentFirstName} </td>
            <td> {props.invoice.agentLastName} </td>
            <td> {props.invoice.amount} </td>
            <td> {props.invoice.deductibleDue} </td>
        </tr> 
     );
}

const ViewInvoices = () => {

    const [invoices, setInvoices] = useState([]);

    const fetchCustomers = async () => {
        await createAPIEndpoint(ENDPOINTS.invoices).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const customerList = data.map((value: any) => {
                    let customer: Invoice;
                    customer = {
                        agentFirstName: value.agentFirstName,
                        agentLastName: value.agentLastName,
                        amount: value.amount,
                        deductibleDue: value.deductibleDue
                    };
                    return customer;
                });

                return customerList
            })
            .then((list) => {
                setInvoices(list);
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
                <tbody>
                    {invoices.map((value, index) => {
                        return (<InvoiceRecord invoice={value} key={index } />);
                    })}
                </tbody>
            </table>
            <AddInvoice />
            <UpdateInvoice />
            <DeleteInvoice />
        </div>      
    );
}

export default ViewInvoices;