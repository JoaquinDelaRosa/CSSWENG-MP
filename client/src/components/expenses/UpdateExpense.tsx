import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isExpenseExists } from '../../utils/CheckFKExists';
import { isAlphabetic } from '../../utils/Regex';
import { ExpenseRequest } from './ExpenseDetails';


const UpdateExpense = () => {
    const [modifiedId, setModifiedId] = useState<number>(-1);
    const {register, handleSubmit, formState: {errors}} = useForm<ExpenseRequest>()
    const [expenseExists, setExpenseExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.updateExpense).patch(data, { "id": modifiedId })
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
        createAPIEndpoint(ENDPOINTS.getExpense).fetch({"id" : id})
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
                        isExpenseExists(parseInt(e.target.value),setExpenseExists);
                        }}/>
                    <p hidden={expenseExists}>Expense does not exist</p>
                </div>
                <div>
                      <label htmlFor="dateRecorded"> Date Recorded </label>
                      <input {...register('dateRecorded', {required: true})} 
                      type="date" name="dateRecorded"/>
                      {errors.dateRecorded && <p> Date Recorded is required</p>}
                  </div>
                  <div>
                      <label htmlFor="description"> Description </label>
                      <input {...register('description', {required: true, pattern: isAlphabetic })} 
                      type="text" name="description"/>
                      {errors.description && <p> Description is required</p>}
                  </div>
                  <div>
                      <label htmlFor="amount"> Amount </label>
                      <input {...register('amount', {required: true})} 
                      type="number" name="amount"/>
                      {errors.amount && <p> Amount is required</p>}
                  </div>
                  <div>
                      <label htmlFor="orderId"> Order ID </label>
                      <input {...register('orderId', {required: true})} 
                      type="number" name="orderId"/>
                      {errors.orderId && <p> Order ID is required</p>}
                  </div>
                <input type='button' name="submit" onClick={onSubmit} value={"Submit"} />
            </form>
        </div>  
    );
}

export default UpdateExpense;