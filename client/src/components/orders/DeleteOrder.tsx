import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { DeleteContainer, DelIcon } from "../../style/DeleteButton";
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
            <button onClick={onSubmit}><DelIcon></DelIcon> </button>
      </DeleteContainer>
    );
}