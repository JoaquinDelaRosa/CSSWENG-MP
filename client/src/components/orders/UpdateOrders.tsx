import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { EditButton } from "../../style/EditButton";
import { isRole } from "../../utils/CheckRole";
import { ModalWrapper } from "../base/ModalBase";
import { Order, OrderRequest } from "./OrderDetails";
import { RequestOrder } from "./RequestOrder";

export const UpdateOrder = (props : {order : Order, observer : Function}) => {
    const [data, setData] = useState<OrderRequest>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    
    useEffect(() => {
        if (isRole("VIEW")) 
            return;
        createAPIEndpoint(ENDPOINTS.updateOrder).post(data, {id: props.order.id})
        .then(function (response) {
            props.observer();
            setIsVisible(false);
        })
        .catch(function (error) {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <EditButton>
          <ModalWrapper front={"Edit"} isVisible={isVisible} setIsVisible={setIsVisible}>
            <RequestOrder setResponse={setData} default={{
                ...props.order, 
                timeIn: new Date(props.order?.timeIn), 
                timeOut: new Date(props.order?.timeOut),
                customer: {
                    id: props.order?.customer?.id,
                    name: props.order?.customer?.name?.val
                },
                vehicle: {
                    id: props.order?.vehicle?.id,
                    licensePlate: props.order?.vehicle?.licensePlate
                },
                invoice: {
                    ...props.order.invoice,
                    datePaid: new Date(props.order?.invoice.datePaid)
                },
                expenses: props.order?.expenses,
                scopeOfWork: props.order?.scopeOfWork
            }}/>
          </ModalWrapper>
        </EditButton>
    )
}