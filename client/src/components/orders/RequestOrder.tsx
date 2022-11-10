import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { isCustomerExists } from "../../utils/CheckFKExists";
import { isAlphabetic, isAlphaNumeric, isEmail, isMobileNumber } from "../../utils/Regex";
import { Order, OrderRequest } from "./OrderDetails";

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
            <form onSubmit={onSubmit}>
                <div>
                    <label>Order Status</label>
                    <select {...register('status', {required: true})} 
                        defaultValue= {(props.default && props.default.status) ? 
                            props.default.status : "DEFAULT"}>
                        <option value="DEFAULT" disabled>-- Select Status --</option>
                        {
                            statuses.map((value, index) => {
                                return (
                                    <option key={index + 1}
                                        value={value}> {value} </option>
                                );
                            })
                        }
                    </select>
                </div>
                <div>
                    <label >Time In</label>
                    <input {...register('timeIn', {
                        required: true, valueAsDate : true, validate: {
                            isAfterTimeIn: (v) =>{
                                if(isNaN(v.valueOf()))
                                    return false;
                                return getValues("timeOut") >= getValues("timeIn");
                            }
                        }
                     })} type='date' name="timeIn" id ="timeIn" value= {(props.default && props.default.timeIn) ? 
                        props.default.timeIn.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
                        replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') : "DEFAULT"}/>
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
                        type='date' name="timeOut" id="timeOut" value= {(props.default && props.default.timeOut) ? 
                            props.default.timeOut.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
                            replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') : "DEFAULT"}/>
                    {errors.timeOut && <p>Time out is earlier than Time in</p>}
                </div>
                <div>
                    <label>Customer Type</label>
                    <select {...register('type', {required: true})} 
                        defaultValue= {(props.default && props.default.type) ? 
                            props.default.type.valueOf() : "DEFAULT"}>
                        <option value="DEFAULT" disabled>-- Select Type --</option>
                        {
                            types.map((value, index) => {
                                return (
                                    <option key={index + 1}
                                        value={value}> {value} </option>
                                );
                            })
                        }
                    </select>
                </div>  
                <div>
                    <label htmlFor="company">Company</label>
                    <input {... register("company", {required : true})}  
                        type='text' name="company" id="company" defaultValue={props.default?.company}/>
                    {errors.company && <p>Company is required</p>}
                </div>
                <div>
                    <label htmlFor="estimateNumber">Estimate Code</label>
                    <input {... register("estimateNumber", {required : true, pattern: isAlphaNumeric})} type='text' name="estimateNumber" id="estimateNumber" defaultValue={props.default?.estimateNumber}/>
                    {errors.estimateNumber && <p>Estimate Code is required</p>}
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