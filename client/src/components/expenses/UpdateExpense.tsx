import { useEffect, useState } from "react";
import { ConvertDate } from "../../utils/ConvertDate";
import { ModalWrapper } from "../base/ModalBase";
import { Expense } from "./ExpenseDetails";

const defaultExpense = {
    amount: 0,
    description: "",
    dateRecorded: new Date()
};

export const UpdateExpense = (props: {setData : Function,  default : Expense}) => {
    const [expense, setExpense] = useState<Expense>(props.default);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onChange = () => {
        props.setData(expense);
        setExpense(expense)
    }

    useEffect(() => {
        setExpense(props.default)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.default])

    return (
        <ModalWrapper front={"Edit"} isVisible={isVisible} setIsVisible={setIsVisible}>
            <div>
                <label htmlFor="expenses.dateRecorded">Date Recorded</label>
                <input type='date' name="expenses.dateRecorded" id="expenses.amount" 
                    value={ConvertDate(new Date(expense.dateRecorded))}
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
        </ModalWrapper>
    );
}