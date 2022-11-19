import { useForm } from "react-hook-form";
import { isAlphabetic, isEmail, isMobileNumber } from "../../utils/Regex";
import { CustomerRequest } from "./CustomerDetails";

export const RequestCustomer = (props : {setResponse : Function, default? : CustomerRequest, isInForm? : boolean}) => {
    
    const {register, handleSubmit, formState: {errors}} = useForm<CustomerRequest>()
    const isInForm = (props.isInForm) ? props.isInForm : true;

    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <div>
            <p className="modalHeader">Editing Customer Table:</p>
            {
                !isInForm && 
                <form className="formStyle" onSubmit={onSubmit} autoComplete="off">
                    <RequestCustomerForm errors={errors} register={register} default={props.default}/>
                    <input type='button' name="submit" className="submit" onClick={onSubmit}value={"SUBMIT"} />
                </form>
            }
            <br />
            {
                isInForm && 
                <div className="formStyle" onSubmit={onSubmit}>
                    <RequestCustomerForm errors={errors} register={register} default={props.default}/>
                    <input type='button' name="submit" className="submit" onClick={onSubmit}value={"SUBMIT"} />
                </div>
            }
        </div> 
    );
}

const RequestCustomerForm = (props : {register : Function, errors : any, default? : CustomerRequest}) => {
    const register = props.register;
    const errors = props.errors;

    return (
        <div>
            <div className="custFirstTag">
                <label htmlFor="firstName" className="custSubText"> First Name </label>
                <input className="custSubField"{... register("firstName", {
                        required : true, 
                        pattern: isAlphabetic 
                    })} 
                />
                    type="text" name = "firstName" 
                    defaultValue={props.default?.firstName} 

                {errors.firstName && <p>Customer First Name is required</p>}
            </div>

            <div className="custLastTag">
                <label htmlFor="lastName" className="custSubText"> Last Name </label>
                <input className="custSubField" {... register("lastName", {
                        required : true, 
                        pattern: isAlphabetic 
                    })} 
                />
                    type="text" 
                    name = "lastName" 
                    defaultValue={props.default?.lastName} 

                {errors.lastName && <p>Customer Last Name is required</p>}
            </div>

            <div className="custEmailTag">
                <label htmlFor="email" className="custSubText"> Email </label>
                <input className="custSubField"{... register("email", {
                        required: true, 
                        pattern: { 
                            value: isEmail, 
                            message: "invalid email address"
                        }
                    })} 
                />
                    type="text" 
                    name="email"
                    defaultValue={props.default?.email} 

                {errors.email && <p>Email is required</p>}
            </div>

            <div className="custMobTag">
                <label htmlFor="mobileNumber" className="custSubText"> Mobile Number </label>
                <input className="custSubField" {... register("mobileNumber", {
                        required: true, 
                        pattern: {value: isMobileNumber, message: "invalid mobile number"}
                    })} 
                />
                    type="text" 
                    name="mobileNumber"
                    defaultValue={props.default?.mobileNumber} 

                {errors.mobileNumber && <p>Mobile Number is required</p>}
            </div>

            <br />
            <br />
        </div>
    );
}