export interface InvoiceRequest {
    amount: number,
    deductibleDue: number,
    agentFirstName: string,
    agentLastName: string,
    datePaid : Date,
    agentCommission : number
}

export interface Invoice {
    invoiceId: number,
    amount: number,
    deductibleDue: number,
    agentFirstName: string,
    agentLastName: string,
    datePaid : string,
    agentCommission : number
}