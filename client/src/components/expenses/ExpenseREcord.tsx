import { DateEntry } from "../base/DateEntry"
import { NumberEntry } from "../base/NumberEntry"
import { Expense } from "./ExpenseDetails"

export const ExpenseRecord = (props : {expense : Expense}) => {
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