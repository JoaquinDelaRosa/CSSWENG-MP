import { DateEntry } from "../base/DateEntry";
import { ModalWrapper } from "../base/ModalBase";
import { NumberEntry } from "../base/NumberEntry";
import { Expense } from "./ExpenseDetails";
import { Invoice } from "./InvoiceDetails"

export const ExpensesDisplay = (props : {expenses? : Array<Expense>}) => {

    if (props.expenses ){
        return (
            <>
                <table>
                    <thead>
                        <tr className="redDialogue">
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

const ExpenseRecord = (props : {expense : Expense}) => {
    console.log(props.expense)
    return (
        <>
            <td className="redDialogue">
                {props.expense.description}
            </td>

            <td className="redDialogue">
                <NumberEntry number={props.expense.amount}/>
            </td>

            <td className="redDialogue">
                <DateEntry date={props.expense.dateRecorded}/>
            </td>
        </>
    )
}