import { Customer } from "../customers/CustomerDetails"
import { Invoice } from "../invoice/InvoiceDetails"
import { Vehicle } from "../vehicles/VehicleDetails"

export interface OrderStatusKVP {
    id: number,
    name: string
}

export interface Order {
    orderId: number,
    status: string, 
    timeIn: string,
    timeOut: string,
    customerDetails: Customer,
    vehicleDetails: Vehicle,
    invoiceDetails: Invoice,
    estimateNumber: string,
    scopeOfWork: string,
    expenses: number
}

export interface OrderRequest {
    status: number,
    timeIn: Date,
    timeOut: Date,
    customerId: number,
    vehicleId: number,
    invoiceId: number,
    estimateNumber: string,
    scopeOfWork: string,
    expenses: number
}