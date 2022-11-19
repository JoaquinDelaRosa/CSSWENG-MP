export const makeCustomerView = (document) => {
    if (document == null)
        return {};
        
    return {
        id: document._id,
        name: {
            firstName: document.firstName,
            lastName: document.lastName,
            val: document.firstName + " " +  document.lastName,
        },
        mobileNumber: document.mobileNumber,
        email: document.email
    };
}

export const makeCustomerArrayView = (documents) => {
    return documents.map((val) => {
        return makeCustomerView(val)
    });
}