const ErrorHandler = require('../Errors/ErrorHandler')
const handleJWTError = (err) => {
  console.log('s')
  return new ErrorHandler("Invalid Token. Please log in again!",401)
}
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // указываем дефолтные значения если никакого значения не будет
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message:err.message
  })

  let error = { ...err };
  if(error.name === "JsonWebTokenError") error = handleJWTError
  next();
}