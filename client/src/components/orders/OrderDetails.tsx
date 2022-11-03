import { Customer } from "../customers/CustomerDetails"
import { Expense } from "../expenses/ExpenseDetails"
import { Invoice, InvoiceRequest } from "../invoice/InvoiceDetails"
import { Vehicle } from "../vehicles/VehicleDetails"

export interface OrderStatusKVP {
    id: number,
    name: string
}

export interface OrderRequest {
    status: string,
    timeIn: Date,
    timeOut: Date,
    customerId: string,
    customerTypeId: string,
    company: string,
    vehicleId: string,
    invoice: InvoiceRequest,
    estimateNumber: string,
    scopeOfWork: string,
    expenses: Array<Expense>
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

