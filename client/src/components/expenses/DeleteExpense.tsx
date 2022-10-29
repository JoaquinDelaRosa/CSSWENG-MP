import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isExpenseExists } from '../../utils/CheckFKExists';


const DeleteExpense = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ id: number }>();
    const [expenseExists, setExpenseExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.deleteExpense).delete({"id" : data.id})
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div>
            <p> Update </p>
            <form>
                <div>
                    <label htmlFor="expenseId"> Input Expense ID </label>
                    <input {... register('id', {required : true,
                    onChange: (e)=> {
                        isExpenseExists(parseInt(e.target.value), setExpenseExists);
                    }})} type="number" name="id"/>
                    {errors.id && <p>Expense ID is required</p>}
                    <p hidden={expenseExists}> Expense does not exist</p>
                </div>
                <input type='button' name="submit" onClick={onSubmit} value={"Submit"} />
            </form>
        </div>  
    );
}

export default DeleteExpense;