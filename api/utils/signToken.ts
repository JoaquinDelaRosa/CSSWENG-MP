import jwt = require('jsonwebtoken');
import config from "../config/authConfig";


// Not super safe just calling "user", but for some reason the interface I made wouldn't work, so I just don't type check it here
const signToken = (user,  callback: (error: Error | null, token: string | null, refreshToken: string | null) => void): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 10000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {
        console.info(`timeSinceEpoch : ${timeSinceEpoch}`)
        console.info(`Attempting sign in with expire time: ${expirationTimeInSeconds}`)
        console.log(user);
        jwt.sign(
            {
                id : user.id,
                role: user.role,
            },
            config.token.secret,
            {
                expiresIn: config.token.expireTime,
                issuer: config.token.issuer
            },
            (error, token) => {
                if (error) {
                    callback(error, null, null);
                } else if (token) {
                    console.log("Making refresh token")
                    const tk = token;
                    // make refresh token
                    jwt.sign(
                        {
                            id : user.id,
                        }
                        , config.refreshToken.secret,
                        {
                            expiresIn: config.refreshToken.expireTime
                        },
                        (error, refreshToken) => {
                            console.log("reached callback")
                            console.log(tk);
                            console.log("_________________________")
                            console.log(refreshToken)
                            if(error) {
                                callback(error, null, null);
                            } 
                            else if(refreshToken) {
                                callback(null, tk, refreshToken);
                            }
                            callback(error, null, null);  
                        }
                    )
                }

            }
        );
    } catch (error) {
        callback(error, null, null);
    }
};

export default signToken;