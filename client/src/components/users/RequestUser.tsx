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
            <p className="modalHeader">Editing User Table:</p>
            <br />
            <form className="formStyle" onSubmit={onSubmit}>
                <div className="firstNameTag">
                    <label htmlFor="firstName" className="userSubText"> First Name </label>
                    <input {... register("firstName", {required : true, pattern: isAlphabetic })} 
                    type="text" name = "firstName" defaultValue={props.default?.firstName} className="userSubField"/>
                    {errors.firstName && <p>User First Name is required</p>}
                </div>
                <div className="lastNameTag">
                    <label htmlFor="lastName" className="userSubText"> Last Name </label>
                    <input {... register("lastName", {required : true, pattern: isAlphabetic })} 
                    type="text" name = "lastName" defaultValue={props.default?.lastName} className="userSubField"/>
                    {errors.lastName && <p>User Last Name is required</p>}
                </div>
                <div className="usernameTag">
                    <label htmlFor="username" className="userSubText"> Username </label>
                    <input {... register("username", {required : true })} 
                    type="text" name = "username" defaultValue={props.default?.username} className="userSubField"/>
                    {errors.username && <p>Username is required</p>}
                </div>
                <div className="userRoleTag">
                    <label className="userSubText">User Role</label>
                    <select className="userSubField" {...register('role', {required: true})} defaultValue={props.default && props.default.role ?  
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
                <br />
                <br />
                <input type='button' name="submit" className="submit" onClick={onSubmit}value={"SUBMIT"} />
            </form>
        </div> 
    );
}