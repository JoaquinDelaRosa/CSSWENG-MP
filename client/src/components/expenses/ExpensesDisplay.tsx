import { DateEntry } from "../base/DateEntry";
import { ModalWrapper } from "../base/ModalBase";
import { NumberEntry } from "../base/NumberEntry";
import { Expense } from "./ExpenseDetails";
import { Invoice } from "../orders/InvoiceDetails"
import { DeleteExpenses } from "./DeleteExpenses";
import { UpdateExpense } from "./UpdateExpense";

export const ExpensesDisplay = (props : {expenses? : Array<Expense>}) => {

    if (props.expenses){
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th> Description </th> 
                            <th> Amount </th>
                            <th> Date Recorded </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        props.expenses.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <ExpenseRecord expense={value}/>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </>
        )
    }
    return null;
}

export const ExpensesModifiableDisplay = (props : {observer : Function , expenses? : Array<Expense>}) => {

    if (props.expenses ){
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th> Description </th> 
                            <th> Amount </th>
                            <th> Date Recorded </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        props.expenses.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <ExpenseRecord expense={value}/>
                                    <td> <UpdateExpense setData={(expense : Expense) => {
                                        if(props.expenses){
                                            props.expenses[index] = expense;
                                            props.observer([...props.expenses]);
                                        }
                                    }} default={value}/> </td>

                                    <td> <DeleteExpenses index={index} observer={(x : number) => {
                                        props.expenses?.splice(x);
                                        props.observer(props.expenses);
                                    }}/> </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </>
        )
    }
    return null;
}

const ExpenseRecord = (props : {expense : Expense}) => {
    return (
        <>
            <td>
                {props.expense.description}
            </td>

            <td>
                <NumberEntry number={props.expense.amount}/>
            </td>

            <td>
                <DateEntry date={props.expense.dateRecorded}/>
            </td>
        </>
    )
}