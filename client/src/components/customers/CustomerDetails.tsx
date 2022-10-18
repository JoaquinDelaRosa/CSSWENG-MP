export interface CustomerRequest {
    firstName: string,
    lastName: string,
    customerTypeId: number,
    company?: string,
}

export interface CustomerTypeKVP {
    id: number,
    name: string
}

export interface Customer {
    customerId: number
    name: string,
    type: string
    company?: string
}