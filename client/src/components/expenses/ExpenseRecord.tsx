import { Expense } from "./ExpenseDetails";
import { DateEntry } from "../base/DateEntry";
import { NumberEntry } from "../base/NumberEntry";
import { ConvertDate } from "../../utils/ConvertDate";


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
                <DateEntry date={ConvertDate(new Date(props.expense.dateRecorded))}/>
            </td>
        </>
    )
}
