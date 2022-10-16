export interface CustomerRequest {
    firstName: string,
    lastName: string,
    customerTypeId: number,
    company?: string,
}

export interface CustomerTypeKVP {
    customerTypeId: number,
    name: string
}

export interface Customer {
    name: string,
    type: string
    company?: string
}