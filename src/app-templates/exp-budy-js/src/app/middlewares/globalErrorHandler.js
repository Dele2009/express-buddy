import config from '../../config.js';
import ApiError from '../../errors/ApiError.js';
import handleValidationError from '../../errors/handleValidationError.js';
import { ZodError } from 'zod';
import handleCastError from '../../errors/handleCastError.js';
import handleZodError from '../../errors/handleZodError.js';
import { logger } from '../../shared/logger.js';
const globalErrorHandler = (error, req, res, next) => {
    config.env === 'development'
        ? logger.error(`globalErrorHandler ~~ ${error}`)
        : logger.error(`globalErrorHandler ~~ ${error}`);
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? error?.stack : undefined,
    });
    next();
};
export default globalErrorHandler;
//path:
//message:
// 2025 Fall
// 2025 and
