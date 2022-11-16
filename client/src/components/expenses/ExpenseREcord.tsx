import "../../style/TableButtons.css";
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { Expense } from "./ExpenseDetails";
import { DateEntry } from "../base/DateEntry";
import { NumberEntry } from "../base/NumberEntry";



export const ExpenseRecord = (props : {expense : Expense}) => {
    console.log(props.expense)
    return (
        <>
            <td className="redDialogue">
                {props.expense.description}
            </td>

            <td className="redDialogue">
                <NumberEntry number={props.expense.amount}/>
            </td>

            <td className="redDialogue">
                <DateEntry date={props.expense.dateRecorded}/>
            </td>
        </>
    )
}