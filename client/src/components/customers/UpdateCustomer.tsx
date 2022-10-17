import { create } from 'domain';
import React, { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { CustomerRequest } from '../customers/CustomerDetails';
import { CustomerTypeKVP } from './CustomerDetails';


const UpdateCustomer = () => {
    const [modifiedId, setModifiedId] = useState<number>(-1);
    const [formState, setFormState] = useState<CustomerRequest>({
        firstName: "",
        lastName: "",
        customerTypeId: 0,
        company: ""
    });

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

    const onInputChange = (name: string, value: any) => {
        setFormState(values => ({ ...values, [name]: value }));
    }

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(formState)
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.updateCustomer).patch(formState, {"id": modifiedId})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    const onModifiedIdChanged = (id: number) => {
        setModifiedId(id);
        createAPIEndpoint(ENDPOINTS.getCustomer).fetch({"id" : id})
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                setFormState(response);
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <p> Update </p>
            <form>
                <label> Id </label>
                <input type="number"
                    name="id"
                    onChange={(e) => { onModifiedIdChanged(parseInt(e.target.value)); }}
                />
                <br/>
                <label>First Name</label>
                <input type="text"
                    name="firstName"
                    onChange={(e) => { onInputChange("firstName", e.target.value); }} />
                <br />

                <label>Last Name</label>
                <input type="text"
                    name="lastName"
                    onChange={(e) => { onInputChange("lastName", e.target.value); }} />
                <br />

                <label>Customer Type</label>
                <select onChange={(e) => { onInputChange("customerTypeId", parseInt(e.target.value)) }}>
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

                <label>Company</label>
                <input type="text"
                    name="firstName"
                    onChange={(e) => { onInputChange("company", e.target.value); }} />
                <br />

                <input type='button'
                    name="submit"
                    onClick={onSubmit}
                    value={"submit"} />
            </form>
        </div>  
    );
}

export default UpdateCustomer;