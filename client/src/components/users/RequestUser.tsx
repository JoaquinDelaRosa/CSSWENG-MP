import { useForm } from "react-hook-form";
import { isAlphabetic } from "../../utils/Regex";
import { UserRequest } from "./UserDetails";

export const RequestUser = (props : {setResponse : Function, default? : UserRequest}) => {
    
    const {register, handleSubmit, formState: {errors}} = useForm<UserRequest>()

    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="firstName"> First Name </label>
                    <input {... register("firstName", {required : true, pattern: isAlphabetic })} 
                    type="text" name = "firstName" defaultValue={props.default?.firstName}/>
                    {errors.firstName && <p>User First Name is required</p>}
                </div>
                <div>
                    <label htmlFor="lastName"> Last Name </label>
                    <input {... register("lastName", {required : true, pattern: isAlphabetic })} 
                    type="text" name = "lastName" defaultValue={props.default?.lastName}/>
                    {errors.lastName && <p>User Last Name is required</p>}
                </div>
                <div>
                    <label htmlFor="username"> Username </label>
                    <input {... register("username", {required : true })} 
                    type="text" name = "username" defaultValue={props.default?.username}/>
                    {errors.username && <p>Username is required</p>}
                </div>
                <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
            </form>
        </div> 
    );
}