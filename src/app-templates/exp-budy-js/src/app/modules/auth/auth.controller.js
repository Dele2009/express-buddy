import { AuthService } from './auth.service.js';
import sendResponse from '../../../shared/sendResponse.js';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login successful!',
        data: result,
    });
});
export const AuthController = { login };
