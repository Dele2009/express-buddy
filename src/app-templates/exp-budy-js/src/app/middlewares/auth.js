import authJwtValidation from '../../helpers/authJwtValidation.js';
const auth = () => async (req, res, next) => {
    try {
        //get authorization token
        const token = req.headers.authorization;
        const verifiedUser = authJwtValidation(token);
        req.user = verifiedUser; //
        next();
    }
    catch (error) {
        next(error);
    }
};
export default auth;
