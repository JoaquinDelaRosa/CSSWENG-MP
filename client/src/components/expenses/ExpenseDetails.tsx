export interface ExpenseRequest {
    dateRecorded : string,
    description : string,
    amount : string,
    orderId : string,
}

export interface Expense {
    expenseId: number,
    dateRecorded : string,
    description : string,
    amount : string,
}