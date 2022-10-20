import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isInvoiceExists } from '../../utils/CheckFKExists';
import { isAlphabetic } from '../../utils/Regex';
import { InvoiceRequest } from './InvoiceDetails';


const UpdateInvoice = () => {
    const [modifiedId, setModifiedId] = useState<number>(-1);
    const {register, handleSubmit, formState: {errors}} = useForm<InvoiceRequest>()
    const [invoiceExists, setInvoiceExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.updateInvoice).patch(data, { "id": modifiedId })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    });

    const onModifiedIdChanged = (id: number) => {
        if(Number.isNaN(id))
            return
        setModifiedId(id);
        createAPIEndpoint(ENDPOINTS.getInvoice).fetch({"id" : id})
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <p> Update </p>
            <form>
                <div>
                    <label> Id </label>
                    <input type="number" name="id"
                    onChange={(e) => {
                        onModifiedIdChanged(parseInt(e.target.value));
                        isInvoiceExists(parseInt(e.target.value),setInvoiceExists);
                        }}/>
                    <p hidden={invoiceExists}>Invoice does not exist</p>
                </div>
                <div>
                      <label htmlFor="agentFirstName"> Agent First Name </label>
                      <input {...register('agentFirstName', {required: true, pattern: isAlphabetic })} 
                      type="text" name="agentFirstName"/>
                      {errors.agentFirstName && <p> Agent First Name is required</p>}
                  </div>
                  <div>
                      <label htmlFor="agentLastName"> Agent Last Name </label>
                      <input {...register('agentLastName', {required: true, pattern: isAlphabetic })} 
                      type="text" name="agentLastName"/>
                      {errors.agentLastName && <p> Agent Last Name is required</p>}
                  </div>
                  <div>
                      <label htmlFor="amount"> Amount </label>
                      <input {...register('amount', {required: true})} 
                      type="number" name="amount"/>
                      {errors.amount && <p> Amount </p>}
                  </div>
                  <div>
                      <label htmlFor="deductibleDue"> Deductible Due </label>
                      <input {...register('deductibleDue', {required: true})} 
                      type="number" name="deductibleDue"/>
                      {errors.deductibleDue && <p> Deductible Due is required</p>}
                  </div>
                <input type='button' name="submit" onClick={onSubmit} value={"Submit"} />
            </form>
        </div>  
    );
}

export default UpdateInvoice;