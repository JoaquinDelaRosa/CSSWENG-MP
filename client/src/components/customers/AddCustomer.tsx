import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios'
import { CustomerRequest, CustomerTypeKVP } from './CustomerDetails';
import { useForm } from 'react-hook-form';



const AddCustomer = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<CustomerRequest>()
    const [typeIds, setTypeIds] = useState<Array<CustomerTypeKVP>>([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.customerTypes).fetch()
            .then((response) => {
                return response.data;
            })
            .then((response: Array<CustomerTypeKVP>) => {
                console.log(response);
                setTypeIds(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const onSubmit = handleSubmit((data) => {
        console.log("data")
        console.log(data)
        createAPIEndpoint(ENDPOINTS.addCustomer).post(data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    });

    return (
          <div>
            <p> Create Customer </p>
              <form onSubmit={onSubmit}>
                  <div>
                      <label htmlFor="firstName"> Customer First Name </label>
                      <input {... register("firstName", {required : true, pattern: /^[a-z ,.'-]+$/i })} 
                      type="text" name = "firstName"/>
                      {errors.firstName && <p>Customer First Name is required</p>}
                  </div>
                  <div>
                      <label htmlFor="lastName"> Customer Last Name </label>
                      <input {... register("lastName", {required : true, pattern: /^[a-z ,.'-]+$/i })} 
                      type="text" name = "lastName"/>
                      {errors.lastName && <p>Customer Last Name is required</p>}
                  </div>
                  <div>
                      <label htmlFor="customerTypeId"> Customer Type </label>
                      <select {...register('customerTypeId', {valueAsNumber: true, required: true})} defaultValue="DEFAULT">
                        <option key={0} value="DEFAULT" disabled>  -- Select Type -- </option>
                          {
                              typeIds.map((value, index) => {
                                  return (
                                    <option key={index + 1} value={value.id}> {value.name} </option>
                                  );
                              })
                          }
                      </select>
                      {errors.customerTypeId && <p>Customer Type ID is required</p>}
                  </div>
                  <div>
                      <label htmlFor="company"> Customer Company </label>
                      <input {... register("company", {required : true})} type="text" name="company"/>
                      {errors.company && <p>Customer Company is required</p>}
                  </div>
                  <input type='button' name="submit" onClick={onSubmit}value={"submit"} />
               </form>
           </div>
      );
}
// TODO TEST
export default AddCustomer;