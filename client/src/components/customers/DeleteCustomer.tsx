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
      <div className="deleteBtn">
        <button onClick={onSubmit}><i className="deleteIcon"></i></button>
      </div> 
    );
}
