import { Customer } from "../customers/CustomerDetails"
import { Expense } from "../expenses/ExpenseDetails"
import { Invoice } from "./InvoiceDetails"
import { Vehicle } from "../vehicles/VehicleDetails"

export interface OrderRequest {
    status: string,
    timeIn: Date,
    timeOut: Date,
    customer : string,
    type: string,
    company: string,
    vehicle: string,
    estimateNumber: string,
    scopeOfWork: string,
    invoice: Invoice,
    expenses: Array<Expense>
}

export interface OrderRequestDefault {
    status: string,
    timeIn: Date,
    timeOut: Date,
    customer : {
        id: string,
        name: string
    },
    type: string,
    company: string,
    vehicle: {
        id: string, 
        licensePlate: string,
    },
    estimateNumber: string,
    scopeOfWork: string,
    invoice: Invoice,
    expenses: Array<Expense>
}

export interface Order {
    verified: boolean,
    id: string,
    status: string, 
    timeIn: string,
    timeOut: string,
    
    customer: Customer,
    type: string,
    company: string,
    vehicle: Vehicle,

    estimateNumber: string,
    scopeOfWork: string,
    expenses: Array<Expense>,
    invoice: Invoice
}

