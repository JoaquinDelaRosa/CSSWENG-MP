import { useEffect, useState } from "react";
import { ConvertDate } from "../../utils/ConvertDate";
import { ModalWrapper } from "../base/ModalBase";
import { InvoiceRequest } from "./InvoiceDetails"

const DEFAULT_INVOICE = {
    agentCommission: 0,
    agentLastName: "",
    agentFirstName: "",
    amount: 0,
    datePaid: new Date(),
    deductible: 0
}

export const InvoiceSubform = (props: {register : any, errors : any, default? : InvoiceRequest}) => {
    const register = props.register;
    const errors = props.errors;
    const [invoice, setInvoice] = useState<InvoiceRequest>(props.default ? props.default : DEFAULT_INVOICE);

    useEffect(() => {
        if (props.default) {
            setInvoice(props.default);
        } else {
            setInvoice(DEFAULT_INVOICE);
        }

    }, [props.default])

    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <ModalWrapper front={"Add Invoice"} isVisible={isVisible} setIsVisible={setIsVisible}>
            <div>
                <br />
                <label htmlFor="invoiceAmount">Invoice Amount</label>
                <input {... register("invoice.amount", {required : false})} type='text' name="invoice.amount" id="invoice.amount"
                    defaultValue={invoice.amount.toString()}/>
                {errors.invoice?.amount && <p>Invoice amount has wrong format</p>}
            </div>

            <div>
                <label htmlFor="invoiceDeductible">Invoice Deductible</label>
                <input {... register("invoice.deductible", {required : false})} type='text' name="invoice.deductible" id="invoice.deductible"
                    defaultValue={invoice.deductible.toString()}/>
                {errors.invoice?.deductible && <p>Deductible has wrong format</p>}
            </div>

            <div>
                <label htmlFor="agentFirstName">Agent First Name</label>
                <input {... register("invoice.agentFirstName", {required : false})} type='text' name="invoice.agentFirstName" id="invoice.agentFirstName"
                    defaultValue={invoice.agentFirstName}/>
                {errors.invoice?.agentFirstName && <p>Agent first name has wrong format</p>}
            </div>

            <div>
                <label htmlFor="agentLastName">Agent Last Name</label>
                <input {... register("invoice.agentLastName", {required : false})} type='text' name="invoice.agentLastName" id="invoice.agentLastName"
                    defaultValue={invoice.agentLastName}/>
                {errors.invoice?.agentLastName && <p>Agent last name has wrong format</p>}
            </div>

            <div>
                <label htmlFor="datePaid">Date Paid</label>
                <input  {...register('invoice.datePaid', {
                    required: false ,
                    valueAsDate : true
                })}

                defaultValue = {
                    props.default ? 
                    (props.default?.datePaid.valueOf() === 0 ? "mm-dd-yyyy" : ConvertDate(props.default?.datePaid)) : ""
                }
                type ="date" name="invoice.datePaid" id="invoice.datePaid"/>
                {errors.invoice?.datePaid && <p>Date is invalid</p>}
            </div>

            <div>
                <label htmlFor="invoiceAgentCommision">Agent Commission</label>
                <input {... register("invoice.agentCommission", {required : false})} type='text' name="invoice.agentCommission" id="invoice.agentCommission"
                defaultValue={
                    invoice.agentCommission.toString()
                }
                />
                {errors.invoice?.agentCommission && <p>Agent Commission has wrong format</p>}
            </div>
            <br />
        </ModalWrapper>
    )
}