import { Customer } from "../customers/CustomerDetails"
import { Expense } from "../expenses/ExpenseDetails"
import { Invoice } from "../invoice/InvoiceDetails"
import { Vehicle } from "../vehicles/VehicleDetails"

export interface OrderStatusKVP {
    id: number,
    name: string
}

export interface OrderRequest {
    status: number,
    timeIn: Date,
    timeOut: Date,
    customerId: number,
    customerTypeId: number,
    company: string,
    vehicleId: number,
    invoiceId: number,
    estimateNumber: string,
    scopeOfWork: string,
    expenses: number
}

export interface Order {
    orderId: number,
    status: string, 
    timeIn: string,
    timeOut: string,
    customerDetails: Customer,
    vehicleDetails: Vehicle,
    invoiceDetails: Invoice,
    customerType: string,
    company: string,
    estimateNumber: string,
    scopeOfWork: string,
    expenses: Array<Expense>
}

