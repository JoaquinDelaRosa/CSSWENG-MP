import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isOrderExists } from '../../utils/CheckFKExists';


const DeleteOrder = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ id: number }>();
    const [orderExists, setOrderExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.deleteOrder).delete({"id" : data.id})
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
                    <input {... register('id', {required : true,
                    onChange: (e)=> {
                        isOrderExists(parseInt(e.target.value), setOrderExists);
                    }})} type="number" name="id"/>
                    {errors.id && <p>Order ID is required</p>}
                    <p hidden={orderExists}> Order does not exist</p>
                </div>
                <input type='button'name="submit" onClick={onSubmit} value={"submit"} />
            </form>
        </div>
    );
}

export default DeleteOrder;