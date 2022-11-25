import { Expense } from "./ExpenseDetails";
import { DateEntry } from "../base/DateEntry";
import { NumberEntry } from "../base/NumberEntry";


export const ExpenseRecord = (props : {expense : Expense}) => {
    console.log(props.expense)
    return (
        <>
            <td>
                {props.expense.description}
            </td>

            <td>
                <NumberEntry number={props.expense.amount}/>
            </td>

            <td>
                <DateEntry date={props.expense.dateRecorded.toDateString()}/>
            </td>
        </>
    )
}
