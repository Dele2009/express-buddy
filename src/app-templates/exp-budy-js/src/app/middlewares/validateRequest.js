const validateRequest = (schema) => async (req, res, next) => {
    try {
        console.log(req.body);
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
        });
        return next();
    }
    catch (error) {
        next(error);
    }
};
export default validateRequest;
