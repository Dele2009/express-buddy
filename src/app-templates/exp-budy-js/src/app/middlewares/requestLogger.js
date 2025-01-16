import { logger } from '../../shared/logger.js';
const requestLogger = (req, res, next) => {
    const { method, url } = req;
    const start = Date.now();
    res.on('finish', () => {
        const { statusCode } = res;
        const duration = Date.now() - start;
        const logMessage = `${method} ${url} ${statusCode} - ${duration}ms`;
        if (statusCode >= 400) {
            logger.error(logMessage);
        }
        else {
            logger.info(logMessage);
        }
    });
    next();
};
export default requestLogger;
