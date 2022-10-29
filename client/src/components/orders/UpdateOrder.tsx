import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { OrderRequest, OrderStatusKVP } from './OrderDetails';
import { isCustomerExists, isVehicleExists, isInvoiceExists, isOrderExists } from '../../utils/CheckFKExists'; 
import { isAlphaNumeric } from '../../utils/Regex';

const UpdateOrder = () => {
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<OrderRequest>()
    const [modifiedId, setModifiedId] = useState<number>(-1);
    const [customerExists, setCustomerExists] = useState<boolean>(true);
    const [vehicleExists, setVehicleExists] = useState<boolean>(true);
    const [invoiceExists, setInvoiceExists] = useState<boolean>(true);
    const [orderExists, setOrderExists] = useState<boolean>(true);
    const [typeDict, setTypeDict] = useState<{[name : string] : number}>({});

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.orderStatuses).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data: Array<OrderStatusKVP>) => {
                console.log(data);
                var dict : {[name : string] : number} = {}
                data.forEach((value : OrderStatusKVP) => {
                    dict[value.name] = value.id;
                setTypeDict(dict)
                })
                console.log(dict)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.updateOrder).patch(data, { "id": modifiedId })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    });

    const onModifiedIdChanged = (id: number) => {
        if(Number.isNaN(id))
            return
        setModifiedId(id);
        createAPIEndpoint(ENDPOINTS.getOrder).fetch({ "id": id })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="FormDiv">
            <p> Update </p>
            <form>
                <div>
                    <label> Existing Order ID </label>
                    <input type="number" name="id" 
                    onChange={(e) => { 
                        onModifiedIdChanged(parseInt(e.target.value));
                        isOrderExists(parseInt(e.target.value),setOrderExists);
                    }} pattern="^[0-9]*$"/>
                     <p hidden={orderExists}>Order does not exist</p>
                </div>
                <div>
                    <label>Order Status</label>
                    <select {...register('status', {valueAsNumber: true, required: true})} defaultValue="DEFAULT">
                        <option value="DEFAULT" disabled>-- Select Status --</option>
                        {
                            Object.keys(typeDict).map((value, index) => {
                                return (
                                    <option key={index + 1}
                                        value={typeDict[value]}> {value} </option>
                                );
                            })
                        }
                    </select>
                </div>
                <div>
                    <label >Time In</label>
                    <input {...register('timeIn', {required: true, valueAsDate : true})}
                        type='date' name="timeIn" id ="timeIn"/>
                </div>
                <div>
                    <label>Time Out</label>
                    <input  {...register('timeOut', {
                        required: true, valueAsDate: true, validate: {
                            isBeforeTimeIn: v => v >= getValues("timeIn")
                        }
                    })}
                        type='date' name="timeOut"/>
                    {errors.timeOut && <p>Time out is earlier than Time in</p>}
                </div>  
                <div>
                    <label htmlFor="customerId">Customer ID</label>
                    <input {... register("customerId", {required : true, 
                        onChange: (e) => {
                            isCustomerExists(parseInt(e.target.value),setCustomerExists)
                        }})}  
                        type='number' name="customerId" id="customerId" />
                    {errors.customerId && <p>Customer ID is required</p>}
                    <p hidden={customerExists}>Customer does not exist</p>
                </div>
                <div>
                    <label htmlFor="customerTypeId">Customer Type ID</label>
                    <input {... register("customerTypeId", {required : true})}  
                        type='number' name="customerTypeId" id="customerTypeId" />
                    {errors.customerTypeId && <p>Customer Type ID is required</p>}
                </div>
                <div>
                    <label htmlFor="company">Company</label>
                    <input {... register("company", {required : true})}  
                        type='text' name="company" id="company" />
                    {errors.company && <p>Company is required</p>}
                </div>
                <div> 
                    <label htmlFor="vehicleId">Vehicle ID</label>
                    <input {... register("vehicleId", {required : true, 
                    onChange: (e) => {
                        isVehicleExists(parseInt(e.target.value),setVehicleExists)
                    }})}  type='number' name="vehicleId" id="vehicleId"/>
                    {errors.vehicleId && <p>Vehicle ID is required</p>}
                    <p hidden={vehicleExists}>Vehicle does not exist</p>
                </div>
                <div>
                    <label htmlFor="invoiceId">Invoice ID</label>
                    <input {... register("invoiceId", {required : false,
                    onChange: (e) => {
                        isInvoiceExists(parseInt(e.target.value),setInvoiceExists)
                    }})} type='number' name="invoiceId" id="invoiceId"/>
                    {errors.invoiceId && <p>Invoice ID is required</p>}
                    <p hidden={invoiceExists}>Invoice does not exist</p>
                </div>
                <div>
                    <label htmlFor="estimateNumber">Estimate Code</label>
                    <input {... register("estimateNumber", {required : true, pattern: isAlphaNumeric})} type='text' name="estimateNumber" id="estimateNumber"/>
                    {errors.estimateNumber && <p>Estimate Code is required</p>}
                </div>
                <div>
                    <label htmlFor="scopeOfWork">Scope of Work</label>
                    <input {... register("scopeOfWork", {required : true})} type='text' name="scopeOfWork" id="scopeOfWork"/>
                    {errors.scopeOfWork && <p>Scope of Work is required</p>}
                </div> 
                <input type='button' name="submit" onClick={onSubmit} value={"Submit"} />
            </form>
        </div>  
    );
}

export default UpdateOrder;