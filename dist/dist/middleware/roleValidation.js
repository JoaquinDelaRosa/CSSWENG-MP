"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRole = (allowedRoles) => {
    return (req, res, next) => {
        if (allowedRoles.includes(res.locals.jwt.role))
            next();
        else {
            res.status(403).json({
                message: 'You do not have permission to access this function'
            });
        }
    };
};
exports.default = validateRole;
