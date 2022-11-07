import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { CustomerRequest, CustomerTypeKVP } from './CustomerDetails';
import { useForm } from 'react-hook-form';
import { isAlphabetic, isEmail, isMobileNumber } from '../../utils/Regex';
import { Navigate, useNavigate } from "react-router-dom";



const AddCustomer = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<CustomerRequest>()
    const [typeIds, setTypeIds] = useState<Array<CustomerTypeKVP>>([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.orderTypes).fetch()
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
                      <label htmlFor="email"> Email </label>
                      <input {... register("email", {required: true, 
                                                    pattern: { value: isEmail,
                                                    message: "invalid email address"}})} 
                                                    type="text" name="email"/>
                      {errors.email && <p>Email is required</p>}
                  </div>
                  <div>
                      <label htmlFor="mobileNumber"> Mobile Number </label>
                      <input {... register("mobileNumber", {required: true, pattern: {
                                                                            value: isMobileNumber,
                                                                            message: "invalid mobile number"}})} 
                                                                            type="text" name="mobileNumber"/>
                      {errors.mobileNumber && <p>Mobile Number is required</p>}
                  </div>
                  <input type='button' name="submit" onClick={onSubmit}value={"Submit"} />
               </form>
           </div>
      );
}
export default AddCustomer;