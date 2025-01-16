// filepath: /src/app/modules/auth/auth.service.ts
import { User } from '../user/user.model.js';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { jwtHelpers } from '../../../helpers/jwtHelpers.js';
import config from '../../../config.js';
const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Invalid password');
    }
    const { password: userPassword, ...userData } = user.toObject();
    const token = jwtHelpers.createToken({ id: user._id, email: user.email }, config.jwt.secret || '', config.jwt.expires_in || '1h');
    return { user: userData, token };
};
export const AuthService = { login };
