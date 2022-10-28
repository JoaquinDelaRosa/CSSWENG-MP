export interface CustomerRequest {
    firstName: string,
    lastName: string,
    customerTypeId: number,
    company?: string,
    mobileNumber : string,
    email : string
}

export interface CustomerTypeKVP {
    id: number,
    name: string
}

export interface Customer {
    name: string,
    type: string
    company?: string
    mobileNumber? : string,
    email? : string
}