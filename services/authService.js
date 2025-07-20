import User from "../models/User.js";
import { successRes } from "../utils/helper.js";

export const createUser = async (inputData) => {
    try {
        const isUserExists = await User.findOne({ email: inputData.email });
        if (isUserExists) {
            let err = new Error('User with this email already exists.');
            err.statusCode = 200;
            throw err;
        }

        const user = await User.create(inputData);
        return user;
    } catch (error) {
        let err = new Error(`${error.message || 'Error while signup in authService.'}`);
        err.statusCode = error.statusCode || 500;
        throw err;
    }
}

export const checkIfUserExists = async (params = null) => {
    try {
        const isUserExists = await User.findOne(params);
        if (!isUserExists)
            return false;

        return isUserExists;
    } catch (error) {
        return false;
    }
}

export const loginUser = async (user, plainPassword) => {
    try {
        const isPasswordMatch = await user.comparePassword(plainPassword);
        if (!isPasswordMatch) {
            let err = new Error('Invalid Email or Password.');
            err.statusCode = 400;
            throw err;
        }

        const token = await user.generateToken();

        if (!token)
            throw new Error('Failed to login');

        return token;
    } catch (error) {
        let err = new Error(`${error.message || 'Error while login in authService.'}`);
        err.statusCode = error.statusCode || 500;
        throw err;
    }
}