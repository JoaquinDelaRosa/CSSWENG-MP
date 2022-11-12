import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { isAlphaNumeric} from "../../utils/Regex";
import { OrderRequest } from "./OrderDetails";

const DEFAULT_STATUS : string = "DEFAULT";
const DEFAULT_TYPE : string = "DEFAULT";

export const RequestOrder = (props : {setResponse : Function, default? : OrderRequest}) => {
    
    const {register, handleSubmit, getValues, formState: {errors}} = useForm<OrderRequest>();
    const [statuses, setStatuses] = useState<Array<string>>([]);
    const [types, setTypes] = useState<Array<string>>([]);
    const [customerExists, setCustomerExists] = useState<boolean>(true);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.orderStatuses).fetch()
            .then((response) => {
                return response.data;
            })
            .then((response: Array<string>) => {
                setStatuses(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.orderTypes).fetch()
            .then((response) => {
                return response.data;
            })
            .then((response: Array<string>) => {
                setTypes(response);
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
            <p>Order</p>
            <form className="formStyle" onSubmit={onSubmit}>
                <div>
                    <label>Order Status</label>
                    <select {...register('status', {required: true, 
                        validate: {
                            isNotDefault: (v) => {
                                return v !== DEFAULT_STATUS;
                            }
                        }})} 
                        defaultValue= {(props.default && props.default.status) ? 
                            props.default.status : DEFAULT_STATUS}>
                        <option value={DEFAULT_STATUS} disabled>-- Select Status --</option>
                        {
                            statuses.map((value, index) => {
                                return (
                                    <option key={index + 1}
                                        value={value}> {value} </option>
                                );
                            })
                        }
                    </select>
                    {errors.status && <p> Status has not been set</p>}
                </div>

                <div>
                    <label >Time In</label>
                    <input {...register('timeIn', {
                        required: true, valueAsDate : true, validate: {
                            isAfterTimeIn: (v) =>{
                                if(isNaN(v.valueOf()))
                                    return false;
                                return getValues("timeOut") >= getValues("timeIn") || isNaN(getValues("timeOut").valueOf());
                            }
                        }
                     })} type='date' name="timeIn" id ="timeIn"/>
                     {errors.timeIn && <p>Time in is invalid</p>}
                </div>
                <div>
                    <label>Time Out</label>
                    <input  {...register('timeOut', {
                        required: false ,valueAsDate: true, validate: {
                            isAfterTimeIn: (v) =>{
                                if(isNaN(v.valueOf()))
                                    return true;
                                return getValues("timeOut") >= getValues("timeIn");
                            }
                        }
                    })}
                        type='date' name="timeOut" id="timeOut"/>
                    {errors.timeOut && <p>Time out is earlier than Time in</p>}
                </div>
                
                <div>
                    <label>Customer Type</label>
                    <select {...register('type', {required: true, 
                        validate: {
                            isNotDefault: (v) => {
                                return v !== DEFAULT_TYPE
                            }
                        }})} 
                        defaultValue= {(props.default && props.default.type) ? 
                            props.default.type.valueOf() : DEFAULT_TYPE}>
                        <option value={DEFAULT_TYPE} disabled>-- Select Type --</option>
                        {
                            types.map((value, index) => {
                                return (
                                    <option key={index + 1}
                                        value={value}> {value} </option>
                                );
                            })
                        }
                    </select>
                    {errors.type && <p> Customer Type has not been set</p>}
                </div> 

                <div>
                    <label htmlFor="company">Company</label>
                    <input {... register("company", {required : false})}  
                        type='text' name="company" id="company" defaultValue={props.default?.company}/>
                    {errors.company && <p>Invalid company</p>}
                </div>
                <div>
                    <label htmlFor="estimateNumber">Estimate Code</label>
                    <input {... register("estimateNumber", {required : false, pattern: isAlphaNumeric})} type='text' name="estimateNumber" id="estimateNumber" defaultValue={props.default?.estimateNumber}/>
                    {errors.estimateNumber && <p>Estimate Code is in an improper format</p>}
                </div>
                <div>
                    <label htmlFor="scopeOfWork">Scope of Work</label>
                    <input {... register("scopeOfWork", {required : true})} type='text' name="scopeOfWork" id="scopeOfWork"/>
                    {errors.scopeOfWork && <p>Scope of Work is required</p>}
                </div>
                <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
            </form>
        </div> 
    );
}
