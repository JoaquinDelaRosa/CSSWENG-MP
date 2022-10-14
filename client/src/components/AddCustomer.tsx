import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import axios from 'axios'

interface CreateCustomerState {
    firstName: string,
    lastName: string,
    customerType: number,
    company?: string,
}

interface CustomerTypeKVP {
    id: number, 
    name: string
}

const AddCustomer = () => {

    const [formState, setFormState] = useState<CreateCustomerState>({
        firstName: "",
        lastName: "",
        customerType: 0,
        company: ""
    });

    const [typeIds, setTypeIds] = useState<Array<CustomerTypeKVP>>([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.customerTypes).fetch()
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                console.log(response);
                setTypeIds(response);
            })
            .catch((err) => {
                console.log(err);
            })
    } , [])

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        createAPIEndpoint(ENDPOINTS.addCustomer).post({
   
            firstName: "John",
            lastName: "Doe",
            CustomerType: 1,
            Company: "IMC"
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    };

      return (
          <form>
              <label>Name</label>
              <input type="text" name="Name" />
              <br />

              <label>Customer Type</label>
              <select>
                  {
                      typeIds.map((value) => {
                          return (
                              <option value={value.id}> {value.name} </option>   
                          );
                      })
                  }
              </select>
              <br />

              <label>Company</label>
              <input type="text" name="Company" />
              <br />

              <input type='button' name="submit" onClick={onSubmit} value={"submit"} />
          </form>
      );
}

export default AddCustomer;