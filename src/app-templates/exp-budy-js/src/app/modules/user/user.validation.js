import { z } from 'zod';
const createValidation = z.object({
    body: z.object({
        firstName: z.string({ required_error: 'firstName is required' }),
        lastName: z.string({ required_error: 'lastName is required' }),
        email: z.string({ required_error: 'email is required' }),
        password: z.string({ required_error: 'password is required' }),
        isSuperUser: z.boolean({ required_error: 'isSuperUser is required' }),
        roles: z.string({ required_error: 'roles is required' }).optional(),
    }),
});
const updateValidation = z.object({
    body: z.object({
        firstName: z.string({ required_error: 'firstName is required' }).optional(),
        lastName: z.string({ required_error: 'lastName is required' }).optional(),
        email: z.string({ required_error: 'email is required' }).optional(),
        password: z.string({ required_error: 'password is required' }).optional(),
        isSuperUser: z
            .boolean({ required_error: 'isSuperUser is required' })
            .optional(),
        roles: z.string({ required_error: 'roles is required' }).optional(),
    }),
});
export const UserValidation = {
    createValidation,
    updateValidation,
};
