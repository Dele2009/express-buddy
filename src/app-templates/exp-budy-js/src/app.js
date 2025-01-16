import cors from 'cors';
import express from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import routes from './app/routes.js';
import cookieParser from 'cookie-parser';
import requestLogger from './app/middlewares/requestLogger.js';
import path from 'path';
const app = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'src/static')));
app.use(cookieParser());
app.use(requestLogger);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use('/api', routes);
app.use((req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
app.use(globalErrorHandler);
export default app;
