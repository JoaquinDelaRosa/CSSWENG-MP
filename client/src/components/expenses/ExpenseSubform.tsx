import { useEffect, useState } from "react";
import { ConvertDate } from "../../utils/ConvertDate";
import { ModalWrapper } from "../base/ModalBase";
import { Expense } from "./ExpenseDetails";
import { ExpensesModifiableDisplay } from "./ExpensesDisplay";

const defaultExpense = {
    amount: 0,
    description: "",
    dateRecorded: new Date()
};

export const ExpenseSubform = (props: {setData : Function,  default? : Expense[]}) => {
    const [expenses, setExpenses] = useState<Array<Expense>>(props.default ? props.default : []);
    const [expense, setExpense] = useState<Expense>(defaultExpense);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onSubmit = () => {
        props.setData(expenses);
        setExpense(defaultExpense);
    }

    const onAdd = () => {
        setExpenses([...expenses, expense]);
        setExpense(defaultExpense);
    }

    const onChange = (expenses : Array<Expense>) => {
        setExpenses(expenses);
    }

    return (
        <ModalWrapper front={"Add Expenses"} isVisible={isVisible} setIsVisible={setIsVisible}>
            <ExpensesModifiableDisplay expenses={expenses} observer={onChange}/>
            <div>
                <label htmlFor="expenses.dateRecorded">Date Recorded</label>
                <input type='date' name="expenses.dateRecorded" id="expenses.amount"
                    value={ConvertDate(expense.dateRecorded)}
                    onChange = {(e) => {
                        setExpense({...expense, dateRecorded: new Date(e.target.value)})
                    }}
                />
            </div>

            <div>
                <label htmlFor="expenses.amount"> Amount</label>
                <input type='text' name="expenses.amount" id="expenses.amount"
                    value={expense.amount}
                    onChange = {(e) => {
                        setExpense({...expense, amount: isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)})
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
            
            <input type="button" name="add" onClick={onAdd} value={"Add Expense"}/>
            <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
        </ModalWrapper>
    );
}