export const makeCustomerView = (document) => {
    return {
        id: document.id,
        name: {
            firstName: document.firstName,
            lastName: document.lastName,
            val: document.firstName + document.lastName,
        },
        mobileNumber: document.mobileNumber,
        email: document.email
    }
}

export const makeCustomerArrayView = (documents) => {
    return documents.map((val) => {
        return makeCustomerView(val)
    })
}