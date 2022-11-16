import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { Customer, CustomerRequest } from "../customers/CustomerDetails";
import { RequestCustomer } from "../customers/RequestCustomer";
import { ModalWrapper } from "../base/ModalBase";

export const CustomerSubform = (props: {observer: Function}) => {
    const [query, setQuery] = useState<string>("");
    const [options, setOptions] = useState<Array<Customer>>([]);
    const [customer, setCustomer] = useState<CustomerRequest>();

    useEffect(() => {
        if (query === ""){
            setOptions([]);
        } else {
            createAPIEndpoint(ENDPOINTS.filterCustomer).fetch({name: query.trim(), skip: 0, limit: 10})
            .then((res) => {
                setOptions(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    } , [query])
    
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addCustomer).post(data)
        .then(function (response) {
            setCustomer(response.data);
            props.observer(response.data.id);
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    return (
        <div> 
            <label> Name </label>
            <input onChange={(e) => {setQuery(e.target.value)} } defaultValue={customer ? customer.firstName + " " + customer.lastName : ""} />   

            <div> 
                {
                    options.length === 0 && 
                    <p> No Customers were found.</p>
                }
                {
                    options.length !== 0 && 
                    <select onChange={(e) => {props.observer(e.target.value)}}> 
                        <option value={""}> {
                            <>{ "-- Select Customer --"}</> 
                        }
                        </option>
                        {
                            options.map((value, index) => {
                                return (
                                    <option value={value.id} key = {index}> {<>{value.name.val}</>} </option>
                                );})
                        }
                    </select>
                }
                { 
                <ModalWrapper front={"Create Customer"}> 
                    <RequestCustomer setResponse={setData} default={customer}/>
                </ModalWrapper>
                }
            </div>
        </div>
    )
}