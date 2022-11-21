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
                <br />
                <br />
                <div>

                    {"Amount: "}
                    <u><NumberEntry number={props.invoice.amount} /></u>

                </div>
                <br />
                <div>
                    {"Date Paid: "}
                    <DateEntry date={props.invoice.datePaid} />
                </div>
                <br />
                <div>

                    {"Deductible Due: "}
                    <u><NumberEntry number={props.invoice.deductible} /></u>

                </div>
                <br />
                <br />
                <br />
                <div>
                    Agent: <i>{props.invoice.agentFirstName + " " + props.invoice.agentLastName}</i>
                </div>
                <br />
                <div>

                    {"Commission: "}
                    <u><NumberEntry number={props.invoice.agentCommission} /></u>

                </div>
            </>
        );
    }
    return null;
}
