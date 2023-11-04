const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  if (!token) {
    return next(createHttpError(401, 'A token is required to access this resource'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = decoded;
    } catch (error) {
    return createHttpError (401, 'Invalid Token');
    }
  // If the token is valid, you can proceed with the next middleware
    return next();
};
