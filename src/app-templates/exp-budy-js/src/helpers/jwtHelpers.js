import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const createToken = (payload, secret, expireTime) => {
    return jwt.sign(payload, secret, {
        expiresIn: expireTime,
    });
};
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};
const createOTP = (length = 6) => {
    const otp = crypto.randomBytes(length).toString('hex').slice(0, length);
    return otp.toUpperCase();
};
export const jwtHelpers = {
    createToken,
    verifyToken,
    createOTP,
};
