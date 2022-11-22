export interface CustomerRequest {
    firstName: string,
    lastName: string,
    mobileNumber : string,
    email : string
}

export interface Customer {
    id : string,
    name: {
        firstName: string,
        lastName: string,
        val: string,
    },
    mobileNumber : string,
    email : string
}