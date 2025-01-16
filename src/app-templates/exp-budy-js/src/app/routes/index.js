import { AuthRoutes } from '../modules/auth/auth.router.js';
import { UserRoutes } from '../modules/user/user.router.js';
import express from 'express';
const router = express.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/user',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
