"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserArrayView = exports.makeUserView = void 0;
const makeUserView = (document) => {
    return {
        username: document.username
    };
};
exports.makeUserView = makeUserView;
const makeUserArrayView = (documents) => {
    return documents.map((val) => {
        return (0, exports.makeUserView)(val);
    });
};
exports.makeUserArrayView = makeUserArrayView;
