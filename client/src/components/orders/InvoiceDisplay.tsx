import { InvoiceText } from "../../style/InvoiceStyle";
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
                    <ModalWrapper front={"..."}>
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
            <InvoiceText>
                {"Amount: "}
                <u><NumberEntry number={props.invoice.amount} /></u><br/>
                {"Date Paid: "}
                <DateEntry date={props.invoice.datePaid} /><br/>
                {"Deductible Due: "}
                <u><NumberEntry number={props.invoice.deductible} /></u><br/>
                Agent: <i>{props.invoice.agentFirstName + " " + props.invoice.agentLastName}</i><br/>
                {"Commission: "}
                <u><NumberEntry number={props.invoice.agentCommission} /></u><br/>
                <div></div>
            </InvoiceText>
        );
    }
    return null;
}
