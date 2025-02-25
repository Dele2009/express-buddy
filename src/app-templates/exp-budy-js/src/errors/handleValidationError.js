const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map((el) => {
        return {
            path: el?.path,
            message: el?.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
export default handleValidationError;
