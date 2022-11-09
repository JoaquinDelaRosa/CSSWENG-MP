export interface ExpenseRequest {
    dateRecorded : Date,
    description : string,
    amount : number,
}

export interface Expense {
    dateRecorded : string,
    description : string,
    amount : number,
}