import { useState } from "react";
import { Expense } from "./ExpenseDetails";

export const ExpenseSubform = (props: {setData : Function}) => {
    const [expense, setExpense] = useState<Expense>({
        amount: 0,
        description: "",
        dateRecorded: Date.now().toString()
    });

    const onSubmit = () => {
        props.setData(expense);
    }

    return (
        <>
            <div>
                <label htmlFor="expenses.dateRecorded">Date Recorded</label>
                <input type='date' name="expenses.dateRecorded" id="expenses.amount" defaultValue={new Date(Date.now()).toDateString()} 
                    onChange = {(e) => {
                        setExpense({...expense, dateRecorded: e.target.value})
                    }}
                />
            </div>

            <div>
                <label htmlFor="expenses.amount"> Amount</label>
                <input type='text' name="expenses.dateRecorded" id="expenses.amount"
                    onChange = {(e) => {
                        setExpense({...expense, amount: parseInt(e.target.value)})
                    }}
                />
            </div>

            <div>
                <label htmlFor="expenses.description">Description</label>
                <input type='text' name="expenses.description" id="expenses.description" 
                    onChange = {(e) => {
                        setExpense({...expense, description: e.target.value})
                    }}
                />
            </div>
            
            <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
        </>
    );
}