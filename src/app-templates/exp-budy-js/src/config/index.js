/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    database_url: process.env.DATABASE_URL,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    mail: {
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};
