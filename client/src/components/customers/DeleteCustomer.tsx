import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { DeleteContainer } from "../../style/DeleteButton";
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
      <DeleteContainer>
        <button onClick={onSubmit}><i></i></button>
      </DeleteContainer> 
    );
}
