export interface OrderStatusKVP {
    "id": number,
    "name": string
}

export interface Order {
    "orderId": number,
    "status": number, 
    "timeIn": string,
    "timeOut": string,
    "customerId": number,
    "vehicleId": number,
    "invoiceId": number,
    "estimateNumber": string,
    "scopeOfWork": string,
    "expenses": number
}

export interface OrderRequest {
    "status": number,
    "timeIn": Date,
    "timeOut": Date,
    "customerId": number,
    "vehicleId": number,
    "invoiceId": number,
    "estimateNumber": string,
    "scopeOfWork": string,
    "expenses": number
}