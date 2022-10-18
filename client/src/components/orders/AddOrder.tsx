import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios';
import { OrderRequest, OrderStatusKVP } from './OrderDetails';
import { isCustomerExists, isVehicleExists, isInvoiceExists } from '../../utils/CheckFKExists'; 
import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AddOrder = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<OrderRequest>()
    const [typeIds, setTypeIds] = useState<Array<OrderStatusKVP>>([]);
    const [customerExists, setCustomerExists] = useState<boolean>(true);
    const [vehicleExists, setVehicleExists] = useState<boolean>(true);
    const [invoiceExists, setInvoiceExists] = useState<boolean>(true);
    

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.orderStatuses).fetch()
            .then((response) => {
                return response.data;
            })
            .then((response: Array<OrderStatusKVP>) => {
                setTypeIds(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.addOrder).post(data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    return (
        <div>
            <p> Add </p>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Order Status</label>
                    <select>
                        {
                            typeIds.map((value, index) => {
                                return (
                                    <option key={index}
                                        value={value.id}> {value.name} </option>
                                );
                            })
                        }
                    </select>
                </div>
                <div>
                    <label >Time In</label>
                    <input type='date' name="timeIn"/>
                </div>
                <div>
                    <label>Time Out</label>
                    <input type='date' name="timeOut"/>
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
                    <input {... register("invoiceId", {required : true,
                    onChange: (e) => {
                        isInvoiceExists(parseInt(e.target.value),setInvoiceExists)
                    }})} type='number' name="invoiceId" id="invoiceId"/>
                    {errors.invoiceId && <p>Invoice ID is required</p>}
                    <p hidden={invoiceExists}>Invoice does not exist</p>
                </div>
                <div>
                    <label htmlFor="estimateNumber">Estimate Number</label>
                    <input {... register("estimateNumber", {required : true})} type='text' name="estimateNumber" id="estimateNumber"/>
                    {errors.estimateNumber && <p>Estimate Number is required</p>}
                </div>
                <div>
                    <label htmlFor="scopeOfWork">Scope of Work</label>
                    <input {... register("scopeOfWork", {required : true})} type='text' name="scopeOfWork" id="scopeOfWork"/>
                    {errors.scopeOfWork && <p>Scope of Work is required</p>}
                </div>      
                <div>
                    <label htmlFor='expenses'>Expenses</label>
                    <input {... register("expenses", {required : true})} type='number' name="expenses" id="expenses"/>
                    {errors.expenses && <p>Expenses is required</p>}
                </div>
                <input type='button' name="submit" onClick={onSubmit} value={"submit"} />
            </form>
        </div>
    );
}

export default AddOrder;