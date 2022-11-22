import { useForm } from "react-hook-form";
import { FormDivStyle} from "../../style/FormStyle";
import { isAlphabetic, isEmail, isMobileNumber } from "../../utils/Regex";
import { CustomerRequest } from "./CustomerDetails";

export const RequestCustomer = (props : {setResponse : Function, default? : CustomerRequest, isInForm? : boolean}) => {
    
    const {register, handleSubmit, formState: {errors}} = useForm<CustomerRequest>()
    const isInForm = (props.isInForm) ? props.isInForm : true;

    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <FormDivStyle>
            <p>Editing Customer Table:</p>
            {
                !isInForm && 
                <form onSubmit={onSubmit} autoComplete="off">
                    <RequestCustomerForm errors={errors} register={register} default={props.default}/>
                    <input type='button' name="submit" onClick={onSubmit}value={"SUBMIT"} />
                </form>
            }
            <br />
            {
                isInForm && 
                <div onSubmit={onSubmit}>
                    <RequestCustomerForm errors={errors} register={register} default={props.default}/>
                    <input type='button' name="submit" onClick={onSubmit}value={"SUBMIT"} />
                </div>
            }
        </FormDivStyle> 
    );
}

const RequestCustomerForm = (props : {register : Function, errors : any, default? : CustomerRequest}) => {
    const register = props.register;
    const errors = props.errors;

    return (
        <div>
            <div>
                <label htmlFor="firstName"> First Name </label>
                <input {... register("firstName", {required : true, pattern: isAlphabetic })} 
                type="text" name = "firstName" defaultValue={props.default?.firstName}/>
                {errors.firstName && <p>Customer First Name is required</p>}
            </div>
            <div>
                <label htmlFor="lastName"> Last Name </label>
                <input {... register("lastName", {required : true, pattern: isAlphabetic })} 
                type="text" name = "lastName" defaultValue={props.default?.lastName}/>
                {errors.lastName && <p>Customer Last Name is required</p>}
            </div>
            <div>
                <label htmlFor="email"> Email </label>
                <input {... register("email", {required: true, 
                                            pattern: { value: isEmail,
                                            message: "invalid email address"}})} 
                                            type="text" name="email"
                                            defaultValue={props.default?.email}/>
                {errors.email && <p>Email is required</p>}
            </div>
            <div>
                <label htmlFor="mobileNumber"> Mobile Number </label>
                <input {... register("mobileNumber", {required: true, pattern: {
                                                                    value: isMobileNumber,
                                                                    message: "invalid mobile number"}})} 
                                                                    type="text" name="mobileNumber"
                                                                    defaultValue={props.default?.mobileNumber}/>
                {errors.mobileNumber && <p>Mobile Number is required</p>}
            </div>
            <br />
            <br />
        </div>
    );
}