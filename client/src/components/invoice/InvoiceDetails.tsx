export interface InvoiceRequest {
    amount: number,
    deductibleDue: number,
    agentFirstName: string,
    agentLastName: string,
}

export interface Invoice {
    invoiceId: number,
    amount: number,
    deductibleDue: number,
    agentFirstName: string,
    agentLastName: string,
}