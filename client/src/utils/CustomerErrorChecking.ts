import { createAPIEndpoint, ENDPOINTS } from "../api"


export const CustomerExistsCheck = async (id : number) : Promise<boolean> => {
    let customerExists : boolean = false;
    if(id == null)
        return false;
    await createAPIEndpoint(ENDPOINTS.getCustomer).fetch({"id" : id})
        .then((response) => {
            return response.data;   
        })
        .then((data) => {
            console.log(data)
            customerExists = (data != "");
        })
        .catch((error) => {
            console.log(error);
        })

    return customerExists;
}
