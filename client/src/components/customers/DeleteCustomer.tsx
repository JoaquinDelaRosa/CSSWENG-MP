import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { Customer } from "./CustomerDetails";

export const DeleteCustomer = (props : {customer : Customer, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteCustomer).delete({"id" : props.customer.id})
            .then((response) => {
                props.observer();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
      <div className="deleteButton">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button onClick={onSubmit}><i className="fa fa-close"></i></button>
      </div> 
    );
}
