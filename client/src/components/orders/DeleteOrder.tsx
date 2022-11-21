import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { DeleteContainer } from "../../style/DeleteButton";
import { Order } from "./OrderDetails";

export const DeleteOrder = (props : {order : Order, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteOrder).delete({"id" : props.order.id})
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