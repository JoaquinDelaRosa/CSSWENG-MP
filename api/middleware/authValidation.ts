import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");
import config from "../config/authConfig";
import refreshToken from "../utils/refreshToken";

const clearRefreshToken = (res : Response) =>{
    res.clearCookie("jwt");
}

const clearAccessToken = (res : Response) =>{
    res.clearCookie("jwt");
}

const handleRefreshTokenExpired = (res : Response, error : any) => {
    clearRefreshToken(res);
    return res.json({
        message: "Refresh token expired, please log in again",
        error,
        auth: false,
    }).end();
}

const handleRenewAccessToken = (res : Response, token: any) => {
    clearAccessToken(res);
    return  res.cookie('jwtacc', token, 
    {
        httpOnly: false,
        secure: true,
        sameSite: "none",
    })
}

const getTokenWithoutBearer = (req : Request) =>{
    return req.headers.authorization?.split(' ')[1];
}

const validateToken = (req : Request, res : Response, next : NextFunction) => {
    const refToken = req.cookies.jwt;

    let token = getTokenWithoutBearer(req);
    if(token) {
    jwt.verify(token, config.token.secret,  {issuer: config.token.issuer}, (error, decoded) => {
        if (error) {
            jwt.verify(refToken, config.refreshToken.secret, (error, refreshDecoded) => {
                // refresh token
                if(error) {
                    return handleRefreshTokenExpired(res, error);
                }
                
                token = refreshToken(refToken)
                
                if(token) {
                    handleRenewAccessToken(res, token);
                    res.locals.jwt = jwt.verify(token, config.token.secret, {issuer: config.token.issuer})
                    next();
                }
                else {
                    return res.json({
                        message: 'Reassigning token failure in authValidation middleware',
                        auth: false
                    }).end()
                }
            });

        } else {
            res.locals.jwt = decoded;
            next();
        }
    })
    } 
    else {
        clearRefreshToken(res);
        clearAccessToken(res);
        return res.json({
            message: 'Unauthorized',
            auth: false,
        }).end()
    }
};

export default validateToken;