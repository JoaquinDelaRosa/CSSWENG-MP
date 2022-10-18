import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isOrderExists } from '../../utils/CheckFKExists';
import { Order } from './OrderDetails';


const DeleteOrder = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Order>();
    const [orderExists, setOrderExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.deleteOrder).delete({"id" : data.orderId})
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div>
            <p> Delete </p>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="orderId"> Input Order ID </label>
                    <input {... register('orderId', {required : true,
                    onChange: (e)=> {
                        isOrderExists(parseInt(e.target.value), setOrderExists);
                    }})} type="number" name="id"/>
                    {errors.orderId && <p>Order ID is required</p>}
                </div>
                <input type='button'name="submit" onClick={onSubmit} value={"submit"} />
            </form>
        </div>
    );
        //todo TEST
}

export default DeleteOrder;