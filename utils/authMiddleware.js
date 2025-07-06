const authMiddleware = (req, res, next) => {
  req.user = { id: "mockUserId" }; // Replace with actual JWT auth
  next();
};

export default authMiddleware;
