import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import axios from 'axios'

function AddCustomer() {

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        axios.post(ENDPOINTS.addCustomer, {
            Name: {
                firstname: "John",
                lastname: "Doe",
                middlename: "Very"
            },
            CustomerType: "PERSONAL",
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