import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { FormDivStyle } from "../../style/FormStyle";
import { isAlphabetic } from "../../utils/Regex";
import { UserRequest } from "./UserDetails";

export const DEFAULT = "DEFAULT";

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
            });
    }, []);

    
    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <FormDivStyle>
            <p>Editing User Table:</p>
            <br />
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
                <div>
                    <label>User Role</label>
                    <select {...register('role', {required: true, validate: {
                        isNotDefault: (v) => {return v !== DEFAULT} 
                    }})} defaultValue={props.default && props.default.role ?  
                            props.default.role : DEFAULT}>
                        <option value={DEFAULT} disabled>-- Select Role --</option>
                        {
                            roles.map((value, index) => {
                                return (
                                    <option key={index + 1}
                                        value={value}> {value} </option>
                                );
                            })
                        }
                    </select>
                    {errors.role && <p> Role is required </p>}
                </div>
                <br />
                <br />
                <input type='button' name="submit" onClick={onSubmit}value={"SUBMIT"} />
            </form>
        </FormDivStyle> 
    );
}