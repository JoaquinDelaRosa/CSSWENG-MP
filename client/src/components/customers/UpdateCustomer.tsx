import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isCustomerExists } from '../../utils/CheckFKExists';
import { isAlphabetic } from '../../utils/Regex';
import { CustomerRequest } from '../customers/CustomerDetails';
import { CustomerTypeKVP } from './CustomerDetails';


const UpdateCustomer = () => {
    const [modifiedId, setModifiedId] = useState<number>(-1);
    const {register, handleSubmit, formState: {errors}} = useForm<CustomerRequest>()
    const [typeIds, setTypeIds] = useState<Array<CustomerTypeKVP>>([]);
    const [customerExists, setCustomerExists] = useState<boolean>(true);
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.orderTypes).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data: Array<CustomerTypeKVP>) => {
                console.log(data);
                setTypeIds(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        createAPIEndpoint(ENDPOINTS.updateCustomer).patch(data, {"id": modifiedId})
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
        createAPIEndpoint(ENDPOINTS.getCustomer).fetch({"id" : id})
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <p> Update </p>
            <form>
                <div>
                    <label> Id </label>
                    <input type="number" name="id"
                        onChange={(e) => {
                            onModifiedIdChanged(parseInt(e.target.value));
                            isCustomerExists(parseInt(e.target.value),setCustomerExists);
                            }}/>
                            <p hidden={customerExists}>Customer does not exist</p>
                </div>
                 <div>
                      <label htmlFor="firstName"> Customer First Name </label>
                      <input {... register("firstName", {required : true, pattern: isAlphabetic })} 
                      type="text" name = "firstName"/>
                      {errors.firstName && <p>Customer First Name is required</p>}
                  </div>
                  <div>
                      <label htmlFor="lastName"> Customer Last Name </label>
                      <input {... register("lastName", {required : true, pattern: isAlphabetic })} 
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
                      <label htmlFor="email"> Email </label>
                      <input {... register("email", {required: true, 
                                                    pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                                    message: "invalid email address"}})} 
                                                    type="text" name="email"/>
                      {errors.email && <p>Email is required</p>}
                  </div>
                  <div>
                      <label htmlFor="mobileNumber"> Mobile Number </label>
                      <input {... register("mobileNumber", {required: true, pattern: {
                                                                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                                                                            message: "invalid mobile number"}})} 
                                                                            type="text" name="company"/>
                      {errors.mobileNumber && <p>Mobile Number is required</p>}
                  </div>
                <input type='button' name="submit" onClick={onSubmit} value={"Submit"} />
            </form>
        </div>  
    );
}

export default UpdateCustomer;