import { useEffect, useState } from "react";
import { Expense } from "./ExpenseDetails";
import { ExpensesDisplay } from "./ExpensesDisplay";

const defaultExpense = {
    amount: 0,
    description: "",
    dateRecorded: Date.now().toString()
};

export const ExpenseSubform = (props: {setData : Function,  default? : Expense[]}) => {
    const [expenses, setExpenses] = useState<Array<Expense>>(props.default ? props.default : []);
    const [expense, setExpense] = useState<Expense>(defaultExpense);

    const onSubmit = () => {
        props.setData(expenses);
    }

    const onAdd = () => {
        setExpenses([...expenses, expense]);
        setExpense(defaultExpense);
    }

    useEffect(() => {
        console.log(props.default);
    }, [props.default])

    return (
        <>
            <ExpensesDisplay expenses={expenses}/>
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
                        setExpense({...expense, description: e.target.value});
                    }}
                />
            </div>
            
            <input type="button" name="add" onClick={onAdd} value={"Add Expense"}/>
            <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
        </>
    );
}