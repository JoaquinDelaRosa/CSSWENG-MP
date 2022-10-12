import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import axios from 'axios'

interface CreateCustomerState {
    name: {
        firstname: string,
        lastname: string,
        middlenme?: string
    },
    customerType: string,
    company?: string
}

const AddCustomer = () => {

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        createAPIEndpoint(ENDPOINTS.addCustomer).post({
            Name: {
                firstname: "John",
                lastname: "Doe",
            },
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
              <input type="text" name="Name"/> <br/>
              <label>Customer Type</label>
              <input type="text" name="CustomerType" /> <br />
              <label>Company</label>
              <input type="text" name="Company" /> <br />

              <input type='button' name="submit" onClick={onSubmit} value={"submit"} />
          </form>
      );
}

export default AddCustomer;