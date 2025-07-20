import { checkIfUserExists, createUser, loginUser } from '../services/authService.js';
import { errorRes } from '../utils/helper.js';
export const signup = async (req, res) => {
    try {
        const { email, password, is_admin = 0 } = req.body;
        const data = {email, password,is_admin }
        const user = await createUser(data);

        return res.status(200).json({ message: "User created successfully.", data: user });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserExists = await checkIfUserExists({ email });
        if (!isUserExists) return errorRes(res, { statusCode: 400, message: 'Invalid Email or Password' });

        const token = await loginUser(isUserExists, password);
        return res.status(200).json({ message: "Loggedin successfully.", token });

    } catch (error) {
        return errorRes(res, error);
    }
}