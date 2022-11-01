"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOrderArrayView = exports.makeOrderView = void 0;
const makeOrderView = (document) => {
    return {
        id: document.id,
        status: document.status,
        timeIn: document.timeIn,
        timeOut: document.timeOut,
        customerDetails: String,
        type: document.type,
        company: document.company,
        vehicleDetails: String,
        invoiceDetails: makeInvoiceView(document.invoice),
        estimateNumber: document.estimateNumber,
        scopeOfWork: document.scopeOfWork,
        expenses: document.expenses.map((value) => {
            return makeExpenseView(value);
        })
    };
};
exports.makeOrderView = makeOrderView;
const makeOrderArrayView = (documents) => {
    return documents.map((val) => {
        return (0, exports.makeOrderView)(val);
    });
};
exports.makeOrderArrayView = makeOrderArrayView;
const makeInvoiceView = (invoice) => {
    return {
        id: invoice.id,
        amount: invoice.amount,
        deductible: invoice.deductible,
        agentFirstName: invoice.agentFirstName,
        agentLastName: invoice.agentLastName,
        datePaid: invoice.datePaid,
        agentComission: invoice.agentComission
    };
};
const makeExpenseView = (expense) => {
    return {
        dateRecorded: expense.Date,
        description: expense.description,
        amount: expense.amount,
    };
};
