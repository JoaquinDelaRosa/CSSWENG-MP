"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOrderArrayView = exports.makeOrderView = void 0;
const customer_1 = require("./customer");
const vehicle_1 = require("./vehicle");
const makeOrderView = (document) => {
    if (document == null)
        return {};
    return {
        id: document._id,
        isVerified: document.isVerified,
        status: document.status,
        timeIn: document.timeIn,
        timeOut: document.timeOut,
        customer: (0, customer_1.makeCustomerView)(document.customer),
        type: document.type,
        vehicle: (0, vehicle_1.makeVehicleView)(document.vehicle),
        invoice: makeInvoiceView(document.invoice),
        estimateNumber: document.estimateNumber,
        scopeOfWork: document.scopeOfWork,
        expenses: document.expenses.map((value) => {
            return makeExpenseView(value);
        }),
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
        amount: parseFloat(invoice.amount),
        deductible: parseFloat(invoice.deductible),
        agentFirstName: invoice.agentFirstName,
        agentLastName: invoice.agentLastName,
        datePaid: invoice.datePaid,
        agentCommission: parseFloat(invoice.agentCommission)
    };
};
const makeExpenseView = (expense) => {
    return {
        dateRecorded: expense.dateRecorded,
        description: expense.description,
        amount: parseFloat(expense.amount)
    };
};
