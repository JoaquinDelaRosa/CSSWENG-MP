import { Customer } from "../customers/CustomerDetails"
import { Expense } from "./ExpenseDetails"
import { Invoice, InvoiceRequest } from "./InvoiceDetails"
import { Vehicle } from "../vehicles/VehicleDetails"

export interface OrderRequest {
    status: string,
    timeIn: Date,
    timeOut: Date,
    customer : string,
    type: string,
    company: string,
    estimateNumber: string,
    scopeOfWork: string,
    invoice: Invoice
}

export interface Order {
    id: string,
    status: string, 
    timeIn: string,
    timeOut: string,
    
    customer: Customer,
    type: string,
    company: string,

    estimateNumber: string,
    scopeOfWork: string,
    expenses: Array<Expense>
    invoice: Invoice
}

