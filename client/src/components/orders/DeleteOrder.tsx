import { createAPIEndpoint, ENDPOINTS } from "../../api";
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
      <div>
        <button onClick={onSubmit}><i></i></button>
      </div> 
    );
}