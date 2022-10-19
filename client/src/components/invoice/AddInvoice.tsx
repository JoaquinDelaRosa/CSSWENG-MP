import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios'
import { InvoiceRequest } from './InvoiceDetails';
import { useForm } from 'react-hook-form';


const AddInvoice = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<InvoiceRequest>()

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        createAPIEndpoint(ENDPOINTS.addInvoice).post(data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    });

    return (
          <div>
            <p> Create Invoice</p>
              <form onSubmit={onSubmit}>
                  <div>
                      <label htmlFor="agentFirstName"> Agent First Name </label>
                      <input {...register('agentFirstName', {required: true, pattern:/^[a-z ,.'-]+$/i })} 
                      type="text" name="agentFirstName"/>
                      {errors.agentFirstName && <p> Agent First Name is required</p>}
                  </div>
                  <div>
                      <label htmlFor="agentLastName"> Agent Last Name </label>
                      <input {...register('agentLastName', {required: true, pattern:/^[a-z ,.'-]+$/i })} 
                      type="text" name="agentLastName"/>
                      {errors.agentLastName && <p> Agent Last Name is required</p>}
                  </div>
                  <div>
                      <label htmlFor="amount"> Amount </label>
                      <input {...register('amount', {required: true})} 
                      type="number" name="amount"/>
                      {errors.amount && <p> Amount </p>}
                  </div>
                  <div>
                      <label htmlFor="deductibleDue"> Deductible Due </label>
                      <input {...register('deductibleDue', {required: true})} 
                      type="number" name="deductibleDue"/>
                      {errors.deductibleDue && <p> Deductible Due is required</p>}
                  </div>
                  <input type='button' name="submit" onClick={onSubmit} value={"submit"} />
               </form>
           </div>
      );
}

export default AddInvoice;