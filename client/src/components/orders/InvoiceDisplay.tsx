import { DateEntry } from "../base/DateEntry";
import { ModalWrapper } from "../base/ModalBase";
import { NumberEntry } from "../base/NumberEntry";
import { Invoice } from "./InvoiceDetails"

export const InvoiceDisplay = (props : {invoice? : Invoice}) => {

    if (props.invoice ){
        return (
            <>
                <div>
                    <p>
                        {"Amount: "}
                        <NumberEntry number={props.invoice.amount}/>
                    </p>
                </div>

                <div>
                    <ModalWrapper front={"Details"}>
                        <DetailedInvoice invoice={props.invoice}/>
                    </ModalWrapper>
                </div>
            </>
        )
    }
    return null;
}

const DetailedInvoice = (props : {invoice? : Invoice}) => { 
    if (props.invoice) {
        return (
            <>
                <div>
                    <p>
                        {"Amount: "}
                        <NumberEntry number={props.invoice.amount}/>
                    </p>
                </div>

                <div>
                    {"Date Paid: "}
                    <DateEntry date={props.invoice.datePaid}/>
                </div>

                <div>
                    <p>
                        {"Deductible Due: "}
                        <NumberEntry number={props.invoice.deductible}/>
                    </p>
                </div>

                <div>
                    <p> Agent: {props.invoice.agentFirstName + " " + props.invoice.agentLastName}</p>
                </div>

                <div>
                    <p>
                        {"Commission: "}
                        <NumberEntry number={props.invoice.agentCommission}/>
                    </p>
                </div>
            </>
        );
    }
    return null;
}
