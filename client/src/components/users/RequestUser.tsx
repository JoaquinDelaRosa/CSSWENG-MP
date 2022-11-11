import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { isAlphabetic } from "../../utils/Regex";
import { UserRequest } from "./UserDetails";

export const RequestUser = (props : {setResponse : Function, default? : UserRequest}) => {
    
    const {register, handleSubmit, formState: {errors}} = useForm<UserRequest>();
    const [roles, setRoles] = useState<Array<string>>([]);
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.userRoles).fetch()
            .then((response) => {
                return response.data;
            })
            .then((response: Array<string>) => {
                setRoles(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    
    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <div>
            <p>User</p>
            <form className="view" onSubmit={onSubmit}>
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
                <div>
                    <label>User Role</label>
                    <select {...register('role', {required: true})} defaultValue={props.default && props.default.role ?  
                            props.default.role : "DEFAULT"}>
                        <option value="DEFAULT" disabled>-- Select Role --</option>
                        {
                            roles.map((value, index) => {
                                return (
                                    <option key={index + 1}
                                        value={value}> {value} </option>
                                );
                            })
                        }
                    </select>
                </div>
                <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
            </form>
        </div> 
    );
}