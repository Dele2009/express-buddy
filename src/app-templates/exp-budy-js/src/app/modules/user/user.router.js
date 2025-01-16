import express from 'express';
import { UserController } from './user.controller.js';
const router = express.Router();
router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getSingleUser);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
export const UserRoutes = router;
