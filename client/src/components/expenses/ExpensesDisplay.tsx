import { Expense } from "./ExpenseDetails";
import { DeleteExpenses } from "./DeleteExpenses";
import { UpdateExpense } from "./UpdateExpense";
import "../../style/ExpensesView.css"
import { ExpenseRecord } from "./ExpenseRecord";

export const ExpensesDisplay = (props : {expenses? : Array<Expense>}) => {

    if (props.expenses){
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th className="expenseHeader"> Description </th> 
                            <th className="expenseHeader"> Amount </th>
                            <th className="expenseHeader"> Date Recorded </th>
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
                        <tr className="redDialogue">
                            <th className="expenseHeader"> Description </th> 
                            <th className="expenseHeader"> Amount </th>
                            <th className="expenseHeader"> Date Recorded </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {
                        props.expenses.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <ExpenseRecord expense={value}/>
                                    <td> 
                                        <UpdateExpense setData={
                                            (expense : Expense) => {
                                                if(props.expenses){
                                                    props.expenses[index] = expense;
                                                    props.observer([...props.expenses]);
                                                }
                                            }
                                        } 
                                        default={value}/> 
                                    </td>

                                    <td> 
                                        <DeleteExpenses index={index} 
                                        observer={(x : number) => {
                                            props.expenses?.splice(x);
                                            props.observer(props.expenses);
                                        }}/>
                                     </td>
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

