import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isCustomerExists } from '../../utils/CheckFKExists';
import { Customer } from './CustomerDetails';

const DeleteCustomer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ id: number }>();
    const [customerExists, setCustomerExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.deleteCustomer).delete({"id" : data.id})
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
                    <label htmlFor="customerId"> Input Order ID </label>
                    <input {... register('id', {required : true,
                    onChange: (e)=> {
                        isCustomerExists(parseInt(e.target.value), setCustomerExists);
                    }})} type="number" name="id"/>
                    {errors.id && <p>Customer ID is required</p>}
                </div>
                <input type='button'name="submit" onClick={onSubmit} value={"submit"} />
            </form>
        </div>
    );
}

export default DeleteCustomer;