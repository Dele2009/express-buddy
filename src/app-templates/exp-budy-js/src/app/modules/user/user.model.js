import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    firstName: { type: String, maxlength: 40, required: true },
    lastName: { type: String, maxlength: 40, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isSuperUser: { type: Boolean, default: false },
    roles: { type: [String], default: null },
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
export const User = model('User', userSchema);
