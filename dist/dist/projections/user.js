"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserArrayView = exports.makeUserView = void 0;
const makeUserView = (document) => {
    if (document == null)
        return {};
    return {
        id: document._id,
        firstName: document.firstName,
        lastName: document.lastName,
        username: document.username,
        role: document.role,
    };
};
exports.makeUserView = makeUserView;
const makeUserArrayView = (documents) => {
    return documents.map((val) => {
        return exports.makeUserView(val);
    });
};
exports.makeUserArrayView = makeUserArrayView;
