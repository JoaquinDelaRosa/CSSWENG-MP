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
}

export interface Order {
    id: string,
    status: string, 
    timeIn: string,
    timeOut: string,
    customerDetails: Customer,
    type: string,
    company: string,
    vehicleDetails: Vehicle,
    invoiceDetails: Invoice,
    estimateNumber: string,
    scopeOfWork: string,
    expenses: Array<Expense>
}

