"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCustomerArrayView = exports.makeCustomerView = void 0;
const makeCustomerView = (document) => {
    if (document == null)
        return {};
    return {
        id: document._id,
        name: {
            firstName: document.firstName,
            lastName: document.lastName,
            val: document.firstName + " " + document.lastName,
        },
        mobileNumber: document.mobileNumber,
        email: document.email,
        company: document.company,
        insurance: document.insurance,
        remarks: document.remarks
    };
};
exports.makeCustomerView = makeCustomerView;
const makeCustomerArrayView = (documents) => {
    return documents.map((val) => {
        return exports.makeCustomerView(val);
    });
};
exports.makeCustomerArrayView = makeCustomerArrayView;
