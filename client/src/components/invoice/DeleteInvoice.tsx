import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isInvoiceExists } from '../../utils/CheckFKExists';
import { Invoice } from './InvoiceDetails';

const DeleteInvoice = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Invoice>();
    const [invoiceExists, setInvoiceExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.deleteInvoice).delete({"id" : data.invoiceId})
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
                    <input {... register('invoiceId', {required : true,
                    onChange: (e)=> {
                        isInvoiceExists(parseInt(e.target.value), setInvoiceExists);
                    }})} type="number" name="id"/>
                    {errors.invoiceId && <p>Invoice ID is required</p>}
                </div>
                <input type='button'name="submit" onClick={onSubmit} value={"submit"} />
            </form>
        </div>
    );
    //todo TEST
}

export default DeleteInvoice;