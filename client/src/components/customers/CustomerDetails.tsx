export interface CustomerRequest {
    firstName: string,
    lastName: string,
    mobileNumber : string,
    email : string
}

export interface CustomerTypeKVP {
    id: number,
    name: string
}

export interface Customer {
    name: string,
    mobileNumber? : string,
    email? : string
}