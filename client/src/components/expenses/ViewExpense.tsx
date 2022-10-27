import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import AddExpense from "./AddExpense";
import DeleteExpense from "./DeleteExpense";
import { Expense } from "./ExpenseDetails";
import UpdateExpense from "./UpdateExpense";


const ExpenseRecord = (props : { expense: Expense}) => {
    return (
        <tr>
            <td> {props.expense.dateRecorded} </td>
            <td> {props.expense.description} </td>
            <td> {props.expense.amount} </td>
            <td> {props.expense.orderId} </td>
        </tr> 
     );
}

const ViewExpenses = () => {

    const [expenses, setExpenses] = useState([]);

    const fetchCustomers = async () => {
        await createAPIEndpoint(ENDPOINTS.expenses).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const expenseList = data.map((value: any) => {
                    let expense: Expense = value;
                    return expense;
                });

                return expenseList
            })
            .then((list) => {
                setExpenses(list);
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
                        <th> Date Recorded </th>
                        <th> Description </th>
                        <th> Amount </th>
                        <th> Order ID </th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map((value, index) => {
                        return (<ExpenseRecord expense={value} key={index } />);
                    })}
                </tbody>
            </table>
            <AddExpense />
            <UpdateExpense />
            <DeleteExpense />
        </div>      
    );
}

export default ViewExpenses;