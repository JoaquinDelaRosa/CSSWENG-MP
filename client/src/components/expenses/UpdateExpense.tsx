import { useState } from "react";
import { Expense } from "./ExpenseDetails";

const defaultExpense = {
    amount: 0,
    description: "",
    dateRecorded: Date.now().toString()
};

export const UpdateExpense = (props: {setData : Function,  default : Expense}) => {
    const [expense, setExpense] = useState<Expense>(defaultExpense);

    const onChange = () => {
        props.setData(expense);
        setExpense(defaultExpense);
    }
    return (
        <>
            <div>
                <label htmlFor="expenses.dateRecorded">Date Recorded</label>
                <input type='date' name="expenses.dateRecorded" id="expenses.amount" 
                    value={expense.dateRecorded}
                    onChange = {(e) => {
                        setExpense({...expense, dateRecorded: e.target.value})
                    }}
                />
            </div>

            <div>
                <label htmlFor="expenses.amount"> Amount</label>
                <input type='text' name="expenses.amount" id="expenses.amount" 
                    value={expense.amount}
                    onChange = {(e) => {
                        setExpense({...expense, amount: parseInt(e.target.value)})
                    }}
                />
            </div>

            <div>
                <label htmlFor="expenses.description">Description</label>
                <input type='text' name="expenses.description" id="expenses.description" 
                    value={expense.description}
                    onChange = {(e) => {
                        setExpense({...expense, description: e.target.value});
                    }}
                />
            </div>
            
            <input type="button" name="submit" onClick={onChange} value={"Apply"}/>
        </>
    );
}