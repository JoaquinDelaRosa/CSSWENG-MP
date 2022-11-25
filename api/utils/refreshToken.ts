import jwt = require('jsonwebtoken');
import config from "../config/authConfig";

const refreshToken = (refreshjwt : string) : string => {

    const decoded = jwt.verify(refreshjwt, config.refreshToken.secret);

    if(decoded) {
        return jwt.sign(
            {
                id : decoded.id,
                role: decoded.role,
            },
            config.token.secret,
            {
                expiresIn: config.token.expireTime,
                issuer: decoded.accessIssuer,
            },);
    }

    return "";
}

export default refreshToken;