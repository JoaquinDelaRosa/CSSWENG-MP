import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { Customer, CustomerRequest } from "../customers/CustomerDetails";
import { RequestCustomer } from "../customers/RequestCustomer";
import { ModalWrapper } from "../base/ModalBase";
import { ENDPOINTS } from "../../api/endpoints";

export const CustomerSubform = (props: {observer: Function, default?: {id: string, name: string}}) => {
    const [query, setQuery] = useState<string>("");
    const [options, setOptions] = useState<Array<Customer>>([]);
    const [customer, setCustomer] = useState<CustomerRequest>();

    useEffect(() => {
        props.observer("");
        
        if (query === ""){
            setOptions([]);
        } else {
            createAPIEndpoint(ENDPOINTS.filterCustomer).fetch({name: query.trim(), skip: 0, limit: 10})
            .then((res) => {
                setOptions(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [query, props.default])

    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addCustomer).post(data)
        .then(function (response) {
            setCustomer(response.data);
            props.observer(response.data.id);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    return (
        <div>
            <input type="text" onChange={(e) => {setQuery(e.target.value)} } defaultValue={customer ? customer.firstName + " " + customer.lastName : 
            props.default? props.default?.name : ""} />   

            <div>
                <br /> 
                <br />
                {
                    options.length !== 0 && 
                    <select onChange={(e) => {
                            props.observer(e.target.value)}
                        } 
                        defaultValue={props.default?.id}> 
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
                    <div> 
                    <ModalWrapper front={"Create Customer"}> 
                        <RequestCustomer setResponse={setData} default={customer}/>
                    </ModalWrapper>
                    </div>
                }
            </div>
        </div>
    )
}