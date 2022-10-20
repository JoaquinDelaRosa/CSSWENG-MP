import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isInvoiceExists } from '../../utils/CheckFKExists';

const DeleteInvoice = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ id: number }>();
    const [invoiceExists, setInvoiceExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.deleteInvoice).delete({"id" : data.id})
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
                    <label htmlFor="invoiceId"> Input Invoice ID </label>
                    <input {... register('id', {required : true,
                    onChange: (e)=> {
                        isInvoiceExists(parseInt(e.target.value), setInvoiceExists);
                    }})} type="number" name="id"/>
                    {errors.id && <p>Invoice ID is required</p>}
                    <p hidden={invoiceExists}> Invoice does not exist</p>
                </div>
                <input type='button'name="submit" onClick={onSubmit} value={"Submit"} />
            </form>
        </div>
    );
}

export default DeleteInvoice;