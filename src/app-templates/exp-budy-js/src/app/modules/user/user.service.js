import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { User } from './user.model.js';
import ApiError from '../../../errors/ApiError.js';
import httpStatus from 'http-status';
import { userSearchableFields } from './user.constant.js';
import { jwtHelpers } from '../../../helpers/jwtHelpers.js';
import sendEmail from '../../services/email.service.js';
const getAllUser = async (filters, paginationOptions) => {
    // all User
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    //   search text
    if (searchTerm) {
        andConditions.push({
            $or: userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // make and query
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                // Check if the value is a string "true" or "false"
                if (value === 'true' || value === 'false') {
                    return { [field]: JSON.parse(value) };
                }
                return { [field]: value };
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await User.find(whereConditions)
        .select('-password')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await User.countDocuments(whereConditions); // Count documents with filter applied
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const createUser = async (payload) => {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User with this email already exists');
    }
    if ('roles' in payload) {
        payload.roles = JSON.parse(payload.roles);
    }
    const otp = jwtHelpers.createOTP();
    await sendEmail(payload.email, 'Email Verification', 'verifyEmail', {
        name: `${payload.firstName} ${payload.lastName}`,
        otp,
    });
    const newUser = await User.create(payload);
    const { password, ...userData } = newUser.toObject();
    // const token = jwtHelpers.createToken(
    //   { id: newUser._id, email: newUser.email },
    //   config.jwt.secret || '',
    //   config.jwt.expires_in || '1h',
    // );
    return userData;
};
const updateUser = async (id, payload) => {
    const result = await User.findOne({ _id: id });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }
    Object.assign(result, payload);
    await result.save();
    return result;
};
const getSingleUser = async (id) => {
    const result = await User.findById(id).select('-password');
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }
    return result;
};
const deleteUser = async (id) => {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }
    return result;
};
export const UserService = {
    getAllUser,
    createUser,
    updateUser,
    getSingleUser,
    deleteUser,
};
