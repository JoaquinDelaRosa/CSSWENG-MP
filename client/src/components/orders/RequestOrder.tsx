import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { isAlphaNumeric} from "../../utils/Regex";
import { ModalWrapper } from "../base/ModalBase";
import { CustomerSubform } from "./CustomerSubform";
import { Expense } from "../expenses/ExpenseDetails";
import { ExpenseSubform } from "../expenses/ExpenseSubform";
import { InvoiceSubform } from "./InvoiceSubform";
import { OrderRequest, OrderRequestDefault } from "./OrderDetails";
import { VehicleSubform } from "./VehicleSubform";

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

    const onSubmit = handleSubmit(async (data) => {
        props.setResponse(data);
    });

    return (
        <div>
            <p className="modalHeader">Editing Order Table:</p>
            <form className="formStyle" onSubmit={onSubmit}>
                <div className="orderStatTag">
                    <label className="orderSubText">Order Status</label>
                    <select className="orderSubField" {...register('status', {required: true, 
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

                <div className="timeInTag">
                    <label className="orderSubText">Time In</label>
                    <input className="orderSubField" {...register('timeIn', {
                        required: true, valueAsDate : true, validate: {
                            isAfterTimeIn: (v) =>{
                                if(isNaN(v.valueOf()))
                                    return false;
                                return getValues("timeOut") >= getValues("timeIn") || isNaN(getValues("timeOut").valueOf());
                            }
                        }
                     })} defaultValue = {
                        props.default ? 
                        props.default.timeIn.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') : ""
                    }
                     type='date' name="timeIn" id ="timeIn"/>
                     {errors.timeIn && <p>Time in is invalid</p>}
                </div>

                <div className="timeOutTag">
                    <label className="orderSubText">Time Out</label>
                    <input className="orderSubField" {...register('timeOut', {
                        required: false ,valueAsDate: true, validate: {
                            isAfterTimeIn: (v) =>{
                                if(isNaN(v.valueOf()))
                                    return true;
                                return getValues("timeOut") >= getValues("timeIn");
                            }
                        }
                    })} defaultValue = {
                        props.default ? 
                        props.default.timeOut.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') : ""
                    }
                    type='date' name="timeOut" id="timeOut"/>
                    {errors.timeOut && <p>Time out is earlier than Time in</p>}
                </div>
                
                <div className="custTypeTag">
                    <label className="orderSubText">Customer Type</label>
                    <select className="orderSubField" {...register('type', {required: true, 
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

                <div className="custNameTag">
                    <label className="orderSubText">Customer Name</label>
                    <CustomerSubform observer={(value : string) => {
                        setValue("customer", value);
                    }} default={props.default?.customer}/>
                </div> 
                <br />
                <div className="orderCompanyTag">
                    <label htmlFor="company" className="orderSubText">Company</label>
                    <input {... register("company", {required : false})}  
                        type='text' name="company" id="company" defaultValue={props.default?.company} className="orderSubField"/>
                    {errors.company && <p>Invalid company</p>}
                </div>

                <div className="orderLicenseTag">
                    <label className="orderSubText">Vehicle</label>
                    <VehicleSubform observer={(value : string) => {
                        setValue("vehicle", value);
                    }}/>
                </div> 
                <br />
                <div className="orderEstimateTag">
                    <label htmlFor="estimateNumber" className="orderSubText">Estimate Code</label>
                    <input className="orderSubField" {... register("estimateNumber", {required : false, pattern: isAlphaNumeric})} type='text' name="estimateNumber" id="estimateNumber" defaultValue={props.default?.estimateNumber}/>
                    {errors.estimateNumber && <p>Estimate Code is in an improper format</p>}
                </div>
                <div className="orderScopeTag">
                    <label htmlFor="scopeOfWork" className="orderSubText">Scope of Work</label>
                    <input className="orderSubField"{... register("scopeOfWork", {required : true})} type='text' name="scopeOfWork" id="scopeOfWork" defaultValue={props.default?.scopeOfWork}/>
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
                <input type='button' name="submit" className="submit" onClick={onSubmit}value={"SUBMIT"} />
            </form>
        </div> 
    );
}


