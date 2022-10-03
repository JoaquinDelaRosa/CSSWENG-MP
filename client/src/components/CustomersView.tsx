
enum CustomerType {
    PERSONAL = "Personal",
    WALK_IN = "Walk In",
    FLEET = "Fleet",
    INSURANCE = "Insurance",
    OTHER = "Other"
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
            <td> {props.customer.type} </td>
            <td> {props.customer.company} </td>
        </tr> 
     );
}

const CustomersView = () => {
    return (
        <div>
            <table>
                <CustomerRecord customer={{ name: "John Doe", type: CustomerType.PERSONAL, company: "Company X"}} />
                <CustomerRecord customer={{ name: "Jane Doe", type: CustomerType.FLEET }} />
            </table>
        </div>      
    );
}

export default CustomersView;