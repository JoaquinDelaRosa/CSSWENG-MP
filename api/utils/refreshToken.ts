import jwt = require('jsonwebtoken');
import { type } from 'os';
import config from "../config/authConfig";

const refreshToken = async (refreshjwt : string) : Promise<string> => {
    var tk;
    await jwt.verify(refreshjwt, config.refreshToken.secret, (error, decoded) => {
        if(error) {
            console.log(error)
        }
        else if (decoded) { // sign a new access token
            jwt.sign(
                {
                    id : decoded.id,
                    role: decoded.role,
                },
                config.token.secret,
                {
                    expiresIn: config.token.expireTime,
                    issuer: decoded.accessIssuer,
                },
                (error, token) => {
                    if(error) {
                        console.log(error)
                    }
                    else if (token) {
                        tk = token
                    }  
                }
            )
        }
    })
    return tk;
}

export default refreshToken;