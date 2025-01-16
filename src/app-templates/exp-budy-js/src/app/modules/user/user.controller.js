import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { UserService } from './user.service.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { userSearchableFields } from './user.constant.js';
const createUser = catchAsync(async (req, res) => {
    const UserData = req.body;
    const data = await UserService.createUser(UserData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Verifcation Email has been sent successfully!',
        data,
    });
});
const getAllUser = catchAsync(async (req, res) => {
    const filters = pick(req.query, ['searchTerm', 'isSuperUser', ...userSearchableFields]);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await UserService.getAllUser(filters, paginationOptions);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
});
const updateUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateAbleData = req.body;
    const result = await UserService.updateUser(id, updateAbleData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Updated successfully!',
        data: result,
    });
});
const getSingleUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.getSingleUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved  successfully!',
        data: result,
    });
});
const deleteUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully!',
        data: result,
    });
});
export const UserController = {
    getAllUser,
    createUser,
    updateUser,
    getSingleUser,
    deleteUser,
};
