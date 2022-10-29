export interface ExpenseRequest {
    dateRecorded : Date,
    description : string,
    amount : number,
    orderId : string,
}

export interface Expense {
    dateRecorded : string,
    description : string,
    amount : number,
    orderId : string,
}