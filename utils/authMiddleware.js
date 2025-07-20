import jwt from "jsonwebtoken";
import { errorRes } from "./helper.js";

const authMiddleware = (req, res, next) => {
  req.user = { id: "mockUserId" }; // Replace with actual JWT auth
  next();
};


export const validateToken = async (req, res, next) => {
  let token = req?.headers?.authorization?.split(' ')[1] ?? false;
  if (!token)
    return errorRes(res, { statusCode: 400, message: "Invalid or Missing Token" });

  try {
    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return errorRes(res, { statusCode: 400, message: "Invalid or Missing Token" });

    req.user = decoded;
    next();
  } catch (error) {
    return errorRes(res, { statusCode: 400, message: error.message })
  }
}

export const checkIfAdmin = (req, res, next) => {
  if (!req.user.is_admin) return errorRes(res, { statusCode: 401, message: "Access Denied" });
  next();
}

export default authMiddleware;
