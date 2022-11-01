"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCustomerArrayView = exports.makeCustomerView = void 0;
const makeCustomerView = (document) => {
    return {
        id: document.id,
        name: document.firstName + document.lastName,
        mobileNumber: document.mobileNumber,
        email: document.email
    };
};
exports.makeCustomerView = makeCustomerView;
const makeCustomerArrayView = (documents) => {
    return documents.map((val) => {
        return (0, exports.makeCustomerView)(val);
    });
};
exports.makeCustomerArrayView = makeCustomerArrayView;
