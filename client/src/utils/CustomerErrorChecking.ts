import { createAPIEndpoint, ENDPOINTS } from "../api"


export const CustomerExistsCheck = (id : number) : boolean => {
    let customerExists : boolean = false;
    if(id == null)
        return false;
    createAPIEndpoint(ENDPOINTS.getCustomer).fetch({"id" : id})
        .then((response) => {
            return response.data;   
        })
        .then((data) => {
            customerExists = (data != "");
            console.log(customerExists)
        })
        .catch((error) => {
            console.log(error);
        })

    return customerExists;
}
