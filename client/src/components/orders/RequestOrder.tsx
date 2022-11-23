import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createAPIEndpoint } from "../../api";
import { isAlphaNumeric} from "../../utils/Regex";
import { ModalWrapper } from "../base/ModalBase";
import { CustomerSubform } from "./CustomerSubform";
import { Expense } from "../expenses/ExpenseDetails";
import { ExpenseSubform } from "../expenses/ExpenseSubform";
import { InvoiceSubform } from "./InvoiceSubform";
import { OrderRequest, OrderRequestDefault } from "./OrderDetails";
import { VehicleSubform } from "./VehicleSubform";
import { FormDivStyle } from "../../style/FormStyle";
import { ENDPOINTS } from "../../api/endpoints";

const DEFAULT_STATUS : string = "DEFAULT";
const DEFAULT_TYPE : string = "DEFAULT";

export const RequestOrder = (props : {setResponse : Function, default? : OrderRequestDefault}) => {
    
    const {register, handleSubmit, getValues, setValue, watch, formState: {errors}} = useForm<OrderRequest>();
    const [statuses, setStatuses] = useState<Array<string>>([]);
    const [types, setTypes] = useState<Array<string>>([]);

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
            });
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
            });
    }, []);

    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    useEffect(() => {
        if (props.default?.status) {
            setValue("status", props.default?.status);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.default?.status]);

    useEffect(() => {
        if (props.default?.type){
            setValue("type", props.default?.type);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.default?.type])

    useEffect(() => {
        if (props.default?.expenses){
            setValue("expenses", props.default?.expenses);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.default?.expenses])
     
    useEffect(() => {
        setValue("invoice.deductible", 0);
    }, [])
    
    return (
        <FormDivStyle>
            <p>Editing Order Table</p>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Order Status</label>
                    <select {...register('status', {required: true, 
                        validate: {
                            isNotDefault: (v) => {
                                return v !== DEFAULT_STATUS;
                            }
                        }})} 
                        value = {(props.default && props.default.status) ? 
                            watch("status"): DEFAULT_STATUS}
                        >
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
                    <label>Time In</label>
                    <input {...register('timeIn', {
                        required: true, valueAsDate : true, validate: {
                            isAfterTimeIn: (v) =>{
                                if (watch("timeOut").valueOf() === 0){
                                    return true;
                                }
                                if(isNaN(v.valueOf()))
                                    return false;
                                return watch("timeOut") >= watch("timeIn") || isNaN(watch("timeOut").valueOf());
                            }
                        }
                     })} defaultValue = {
                        props.default ? 
                        props.default?.timeIn.toISOString().split("T")[0] : ""
                    }
                     type='date' name="timeIn" id ="timeIn"/>
                     {errors.timeIn && <p>Time in is invalid</p>}
                </div>

                <div>
                    <label>Time Out</label>
                    <input {...register('timeOut', {
                        required: false ,valueAsDate: true, validate: {
                            isAfterTimeIn: (v) =>{
                                if (watch("timeOut").valueOf() === 0){
                                    return true;
                                }
                                if(isNaN(v.valueOf()))
                                    return true;
                                return watch("timeOut") >= watch("timeIn");
                            }
                        }
                    })}
                    defaultValue = {
                        props.default ? 
                        props.default.timeOut.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') : ""
                    }
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
                            watch("type") : DEFAULT_TYPE}>
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
                    <label>Customer Name</label>
                    <CustomerSubform observer={(value : string) => {
                        setValue("customer", value);
                    }} default={props.default?.customer}/>
                </div> 

                <br />

                <div>
                    <label htmlFor="company">Company</label>
                    <input {... register("company", {required : false})}  
                        type='text' name="company" id="company" defaultValue={props.default?.company}/>
                    {errors.company && <p>Invalid company</p>}
                </div>

                <div>
                    <label>Vehicle</label>
                    <VehicleSubform observer={(value : string) => {
                        setValue("vehicle", value);
                    }} default={props.default?.vehicle}/>
                </div> 

                <br />

                <div>
                    <label htmlFor="estimateNumber">Estimate Code</label>
                    <input {... register("estimateNumber", {required : false, pattern: isAlphaNumeric})} type='text' name="estimateNumber" id="estimateNumber" defaultValue={props.default?.estimateNumber}/>
                    {errors.estimateNumber && <p>Estimate Code is in an improper format</p>}
                </div>

                <div>
                    <label htmlFor="scopeOfWork">Scope of Work</label>
                    <input {... register("scopeOfWork", {required : true})} type='text' name="scopeOfWork" id="scopeOfWork" defaultValue={props.default?.scopeOfWork}/>
                    {errors.scopeOfWork && <p>Scope of Work is required</p>}
                </div>
                <br />

                <ModalWrapper front={"Add Invoice"}>
                    <InvoiceSubform default={props.default?.invoice}  errors={errors}  register={register}/>
                </ModalWrapper>
                <br />

                <ModalWrapper front={"Add Expenses"}>
                    <ExpenseSubform setData={(expenses: Expense[]) => {
                        setValue("expenses", expenses)
                    }} default={watch("expenses")}/>
                </ModalWrapper>
                <br />
                
                <input type='button' name="submit" onClick={onSubmit}value={"SUBMIT"} />
            </form>
        </FormDivStyle> 
    );
}


