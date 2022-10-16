import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios'
import { InvoiceRequest } from './InvoiceDetails';


const AddInvoice = () => {

    const [formState, setFormState] = useState<InvoiceRequest>({
        agentFirstName: "",
        agentLastName: "",
        amount: 0,
        deductibleDue: 0
    });

    const onInputChange = (name: string, value: any) => {
        setFormState(values => ({ ...values, [name]: value }));
    }


    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(formState)
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.addInvoice).post(formState)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    return (
          <div>
            <p> Create </p>
              <form>
                  <label>Agent First Name</label>
                  <input type="text"
                      name = "firstName"
                      onChange={(e) => { onInputChange("agentFirstName", e.target.value); } } />
                  <br />

                  <label>Agent Last Name</label>
                  <input type="text"
                      name = "lastName"
                      onChange={(e) => { onInputChange("agentLastName", e.target.value); }} />
                  <br />

                  <label>Amount</label>
                  <input type="number"
                      name="amount"
                      onChange={(e) => { onInputChange("amount", e.target.value); }} />
                  <br />

                  <label>Deductible Due</label>
                  <input type="number"
                      name="deductibleDue"
                      onChange={(e) => { onInputChange("deductibleDue", e.target.value); }} />
                  <br />

                  <input type='button'
                      name="submit"
                      onClick={onSubmit}
                      value={"submit"} />
               </form>
           </div>
      );
}

export default AddInvoice;