import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
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
      <div className="deleteBtn">
        <button onClick={onSubmit}><i className="deleteIcon"></i></button>
      </div> 
    );
}