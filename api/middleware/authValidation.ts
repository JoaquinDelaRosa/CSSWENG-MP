import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");
import config from "../config/authConfig";
import refreshToken from "../utils/refreshToken";
import authz from "../controllers/authz";

const validateToken = (req : Request, res : Response, next : NextFunction) => {
    const refToken = req.cookies.jwt;

    let token = req.headers.authorization?.split(' ')[1]; // remove bearer
    if(token) {
        jwt.verify(token, config.token.secret,  {issuer: config.token.issuer}, (error, decoded) => {
            if (error) {
                
                jwt.verify(refToken, config.refreshToken.secret, (error, refreshDecoded) => {
                    if(error) {
                        return res.status(401).json({
                            message: "Refresh token expired, please log in again",
                            error,
                        })
                    }
                    
                    token = refreshToken(refToken)
                    
                    if(token) {
                        res.cookie('jwtacc', token, 
                                {
                                    httpOnly: false,
                                    secure: true,
                                    sameSite: "none",
                                })
                        res.locals.jwt = jwt.verify(token, config.token.secret, {issuer: config.token.issuer})
                        next();
                    }
                    else {
                        return res.status(401).json({
                            message: 'Reassigning token failure in authValidation middleware',
                        })
                    }
                });

            } else {
                res.locals.jwt = decoded;
                next();
            }
        })
    } else {
        console.log("here")
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
};

export default validateToken;