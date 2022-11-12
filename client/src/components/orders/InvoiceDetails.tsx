export interface InvoiceRequest {
    amount: number,
    deductible: number,
    agentFirstName: string,
    agentLastName: string,
    datePaid : Date,
    agentCommission : number
}

export interface Invoice {
    id : string,
    amount: number,
    deductible: number,
    agentFirstName: string,
    agentLastName: string,
    datePaid : Date,
    agentCommission : number
}