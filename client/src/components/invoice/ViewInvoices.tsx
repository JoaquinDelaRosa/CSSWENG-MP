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
                const invoiceList = data.map((value: any) => {
                    let invoice: Invoice = value;
                    return invoice;
                });

                return invoiceList
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
                <thead>
                    <th> Agent First Name </th>
                    <th> Agent Last Name </th>
                    <th> Amount </th>
                    <th> Deductible Due </th>
                </thead>

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