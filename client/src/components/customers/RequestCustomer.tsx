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
            <p><u>-- Customer --</u></p>
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
            <br />
            <br />
        </FormDivStyle> 
    );
}

const RequestCustomerForm = (props : {register : Function, errors : any, default? : CustomerRequest}) => {
    const register = props.register;
    const errors = props.errors;

    return (
        <div>
            <br />
            <div>
                <label htmlFor="firstName"> First Name </label>
                <input {... register("firstName", {required : true, pattern: isAlphabetic })} 
                type="text" name = "firstName" defaultValue={props.default?.firstName} autoComplete="off"/>
                {errors.firstName && <p>Customer First Name is required</p>}
            </div>
            <div>
                <label htmlFor="lastName"> Last Name </label>
                <input {... register("lastName", {required : true, pattern: isAlphabetic })} 
                type="text" name = "lastName" defaultValue={props.default?.lastName} autoComplete="off"/>
                {errors.lastName && <p>Customer Last Name is required</p>}
            </div>
            <div>
                <label htmlFor="email"> Email </label>
                <input {... register("email", {
                        required: true, 
                        pattern: { 
                            value: isEmail,
                            message: "invalid email address"
                        }
                    })} 
                    type="text" name="email" autoComplete="off"
                    defaultValue={props.default?.email}
                />
                {errors.email && <p>Email is required</p>}
            </div>
            <div>
                <label htmlFor="mobileNumber"> Mobile Number </label>
                <input {... register("mobileNumber", {
                        required: true, 
                        pattern: {
                            value: isMobileNumber,
                            message: "invalid mobile number"
                        }
                    })} 
                    type="text" name="mobileNumber" autoComplete="off"
                    defaultValue={props.default?.mobileNumber}/>
                {errors.mobileNumber && <p>Mobile Number is required</p>}
            </div>
            <div>
                <label htmlFor="company"> Company </label>
                <input {... register("company", {required : false})} 
                type="text" name = "company" defaultValue={props.default?.company} autoComplete="off"/> 
                {errors.company && <p>Company name is wrong format</p>}
            </div>
            <div>
                <label htmlFor="insurance"> Insurance </label>
                <input {... register("insurance", {required : false})} 
                type="text" name = "insurance" defaultValue={props.default?.insurance} autoComplete="off"/>
                {errors.insurance && <p>Insurance is wrong format</p>}
            </div>
            <br />
            <div className="largeBox">
                <label htmlFor="remarks"> Remarks </label>
                <textarea {... register("remarks", {required : false})} 
                type="text" name = "remarks" defaultValue={props.default?.remarks} autoComplete="off"/>
                {errors.remarks && <p>remarks is wrong format</p>}
            </div>
            <br />
            <br />
        </div>
    );
}