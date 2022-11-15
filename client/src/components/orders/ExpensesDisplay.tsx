import { DateEntry } from "../base/DateEntry";
import { ModalWrapper } from "../base/ModalBase";
import { NumberEntry } from "../base/NumberEntry";
import { Expense } from "./ExpenseDetails";
import { Invoice } from "./InvoiceDetails"

export const ExpensesDisplay = (props : {expenses? : Array<Expense>}) => {

    if (props.expenses ){
        return (
            <>
                {
                    props.expenses.map((value, index) => {
                        return (
                            <div key={index}>
                                <ExpenseRecord expense={value}/>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    return null;
}

const ExpenseRecord = (props : {expense : Expense}) => {
    return (
        <>
            <p>
                {"Description: " + props.expense.description}
            </p>

            <p>
                {"Amount: "}
                <NumberEntry number={props.expense.amount}/>
            </p>

            <div>
                {"Date Paid: "}
                <DateEntry date={props.expense.dateRecorded}/>
            </div>
        </>
    )
}