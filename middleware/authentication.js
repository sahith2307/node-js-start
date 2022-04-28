const jwtToken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret_key = process.env.secret_key;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const error = new Error();
  error.status = 403;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const user = jwtToken.verify(token, secret_key);
        req.user = user;
        return next();
      } catch (e) {
        error.message = "invalid/expired token";
        return next(error);
      }
    }
    error.message = "authorization token must be Bearer [token]";
    return next(error);
  }
  error.message = "authorization header must be provided";
  return next(error);
};
