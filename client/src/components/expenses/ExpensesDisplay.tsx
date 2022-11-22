import { Expense } from "./ExpenseDetails";
import { DeleteExpenses } from "./DeleteExpenses";
import { UpdateExpense } from "./UpdateExpense";
import { TableBody, TableHead, TableWrapper } from "../../style/ExpenseTable";
import { ExpenseRecord } from "./ExpenseRecord";

export const ExpensesDisplay = (props : {expenses? : Array<Expense>}) => {

    if (props.expenses){
        return (
            <TableWrapper>
                <table>
                    <TableHead>
                        <tr>
                            <th> Description </th> 
                            <th> Amount </th>
                            <th> Date Recorded </th>
                        </tr>
                    </TableHead>
                    <TableBody>
                    {
                        props.expenses.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <ExpenseRecord expense={value}/>
                                </tr>
                            )
                        })
                    }
                    </TableBody>
                </table>
            </TableWrapper>
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