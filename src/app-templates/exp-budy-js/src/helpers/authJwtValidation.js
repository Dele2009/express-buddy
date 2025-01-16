import httpStatus from 'http-status';
import ApiError from '../errors/ApiError.js';
import { jwtHelpers } from './jwtHelpers.js';
import config from '../config.js';
function authJwtValidation(token) {
    // if no token found
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // verify token
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret);
    // // role guard
    // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
    //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    // }
    return verifiedUser;
}
export default authJwtValidation;
