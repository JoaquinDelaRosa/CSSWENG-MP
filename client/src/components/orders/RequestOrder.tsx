import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { isAlphaNumeric} from "../../utils/Regex";
import { Customer } from "../customers/CustomerDetails";
import { ModalWrapper } from "../ModalBase";
import { OrderRequest } from "./OrderDetails";

const DEFAULT_STATUS : string = "DEFAULT";
const DEFAULT_TYPE : string = "DEFAULT";

export const RequestOrder = (props : {setResponse : Function, default? : OrderRequest}) => {
    
    const {register, handleSubmit, getValues, setValue, formState: {errors}} = useForm<OrderRequest>();
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
                     })} defaultValue = {
                        props.default ? 
                        props.default.timeIn.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') : ""
                    }
                     type='date' name="timeIn" id ="timeIn"/>
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
                    })} defaultValue = {
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
                    <label> <b>  Customer  </b> </label>
                    <CustomerSubform observer={(value : string) => {
                        setValue("customer", value);
                    }}/>
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

                <ModalWrapper front={"Add Invoice"}>
                    <div>
                        <label htmlFor="invoiceAmount">Invoice Amount</label>
                        <input {... register("invoice.amount", {required : false})} type='text' name="invoice.amount" id="invoice.amount"
                            defaultValue={props.default?.invoice.amount}/>
                        {errors.invoice?.amount && <p>Invoice amount has wrong format</p>}
                    </div>

                    <div>
                        <label htmlFor="invoiceDeductible">Invoice Deductible</label>
                        <input {... register("invoice.deductible", {required : false})} type='text' name="invoice.deductible" id="invoice.deductible"
                            defaultValue={props.default?.invoice.deductible}/>
                        {errors.invoice?.deductible && <p>Deductible has wrong format</p>}
                    </div>

                    <div>
                        <label htmlFor="agentFirstName">Agent First Name</label>
                        <input {... register("invoice.agentFirstName", {required : false})} type='text' name="invoice.agentFirstName" id="invoice.agentFirstName"
                             defaultValue={props.default?.invoice.agentFirstName}/>
                        {errors.invoice?.agentFirstName && <p>Agent first name has wrong format</p>}
                    </div>

                    <div>
                        <label htmlFor="agentLastName">Agent Last Name</label>
                        <input {... register("invoice.agentLastName", {required : false})} type='text' name="invoice.agentLastName" id="invoice.agentLastName"
                            defaultValue={props.default?.invoice.agentLastName}/>
                        {errors.invoice?.agentLastName && <p>Agent last name has wrong format</p>}
                    </div>

                    <div>
                        <label htmlFor="datePaid">Date Paid</label>
                        <input {...register('invoice.datePaid', {
                            required: false, valueAsDate : true,})} type='date' name="invoice.datePaid" id ="invoice.datePaid"/>
                        {errors.invoice?.datePaid && <p>Date is invalid</p>}
                    </div>

                    <div>
                        <label htmlFor="invoiceAgentCommision">Agent Comission</label>
                        <input {... register("invoice.agentCommission", {required : false})} type='text' name="invoice.agentCommission" id="invoice.agentCommission"/>
                        {errors.invoice?.agentCommission && <p>Agent Commission has wrong format</p>}
                    </div>
                </ModalWrapper>
                
                <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
            </form>
        </div> 
    );
}


const CustomerSubform = (props: {observer: Function}) => {
    const [query, setQuery] = useState<string>("");
    const [options, setOptions] = useState<Array<Customer>>([]);

    useEffect(() => {
        if (query === ""){
            setOptions([]);
        } else {
            createAPIEndpoint(ENDPOINTS.filterCustomer).fetch({name: query.trim(), skip: 0, limit: 10})
            .then((res) => {
                setOptions(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    } , [query])

    return (
        <div> 
            <label> Name </label>
            <input onChange={(e) => {setQuery(e.target.value)} } />   

            <div> 
                {
                    options.length === 0 && 
                    <p> No Customers were found.</p>
                }
                {
                    options.length !== 0 && 
                    <select onChange={(e) => {props.observer(e.target.value)}}> 
                        <option value={""}> {
                            <>{ "-- Select Customer --"}</> 
                        }
                        </option>
                        {
                            options.map((value, index) => {
                                return (
                                    <option value={value.id} key = {index}> {<>{value.name.val}</>} </option>
                                );})
                        }
                    </select>
                }
                {
                    // Replace this with a Create Customer button (copy from customers folder.)
                    // This should then do a get id call on submit. to get the id of the customer.
                }
            </div>
        </div>
    )
}