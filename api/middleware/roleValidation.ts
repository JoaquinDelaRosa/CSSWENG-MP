import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");

const validateRole = (allowedRoles : string[]) => {
    return (req : Request, res : Response, next : NextFunction) => {
        if(allowedRoles.includes(res.locals.jwt.role))
            next();
        else {
            res.status(401).json({
                message: 'You do not have permission to access this function'
            })
        }
    }
}

export default validateRole;