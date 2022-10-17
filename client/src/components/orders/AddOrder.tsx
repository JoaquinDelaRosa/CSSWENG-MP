import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios'
import { OrderRequest, OrderStatusKVP } from './OrderDetails';
import { CustomerExistsCheck } from '../../utils/CustomerErrorChecking';
import { Form } from 'react-router-dom';

const AddOrder = () => {
    const [formState, setFormState] = useState<OrderRequest>({
        status: 0,
        timeIn: new Date(),
        timeOut: new Date(),
        customerId: 0,
        vehicleId: 0,
        invoiceId: 0,
        estimateNumber: "",
        scopeOfWork: "",
        expenses: 0
    });

    const [typeIds, setTypeIds] = useState<Array<OrderStatusKVP>>([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.orderStatuses).fetch()
            .then((response) => {
                return response.data;
            })
            .then((response: Array<OrderStatusKVP>) => {
                console.log(response);
                setTypeIds(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const onInputChange = (name: string, value: any) => {
        setFormState(values => ({ ...values, [name]: value }));
        console.log(formState);
        // CustomerExistsCheck(formState.customerId)
        //     .then((response) => {
        //         console.log(response)
        //     })
        
    }

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(formState)
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.updateOrder).post(formState)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    return (
        <div>
            <p> Update </p>
            <form>
                <label>Order Status</label>
                <select onChange={(e) => { onInputChange("status", parseInt(e.target.value)) }}>
                    {
                        typeIds.map((value, index) => {
                            return (
                                <option key={index}
                                    value={value.id}> {value.name} </option>
                            );
                        })
                    }
                </select>
                <br />

                <label>timeIn</label>
                <input type='date'
                    name="timeIn"
                    onChange={(e) => { onInputChange("timeIn", e.target.value); }} />
                <br />

                <label>timeOut</label>
                <input type='date'
                    name="timeOut"
                    onChange={(e) => { onInputChange("timeOut", e.target.value); }} />
                <br />

                <label>customerId</label>
                <input type='number'
                    name="customerId"
                    
                    onChange={(e) => { onInputChange("customerId", e.target.value); }} />
                <br />

                {
                    CustomerExistsCheck(formState.customerId) && <div>
                        Hello World
                    </div>
                }

                <label>vehicleId</label>
                <input type='number'
                    name="vehicleId"
                    onChange={(e) => { onInputChange("vehicleId", e.target.value); }} />
                <br />


                <label>invoiceId</label>
                <input type='number'
                    name="invoiceId"
                    onChange={(e) => { onInputChange("invoiceId", e.target.value); }} />
                <br />

                <label>estimateNumber</label>
                <input type='text'
                    name="estimateNumber"
                    onChange={(e) => { onInputChange("estimateNumber", e.target.value); }} />
                <br />

                <label>scopeOfWork</label>
                <input type='text'
                    name="scopeOfWork"
                    onChange={(e) => { onInputChange("scopeOfWork", e.target.value); }} />
                <br />

                <label>expenses</label>
                <input type='number'
                    name="customerId"
                    onChange={(e) => { onInputChange("expenses", e.target.value); }} />
                <br />

                <input type='button'
                    name="submit"
                    onClick={onSubmit}
                    value={"submit"} />
            </form>
        </div>
    );
}

export default AddOrder;