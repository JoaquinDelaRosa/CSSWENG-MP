import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ExpenseRequest } from './ExpenseDetails';
import { useForm } from 'react-hook-form';
import { isAlphabetic } from '../../utils/Regex';


const AddExpense = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ExpenseRequest>()

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        createAPIEndpoint(ENDPOINTS.addExpense).post(data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    });

    return (
          <div>
            <p> Create Expense</p>
              <form onSubmit={onSubmit}>
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

export default AddExpense;