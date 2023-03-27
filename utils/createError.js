const newError = (message, statusCode) => {
  // throw new Error({
  // message: message,
  //     statusCode: statusCode

  // })
  const error = new Error();
  error.message = message;
  error.statuCode = statusCode;
  return error;
};

module.exports = newError;
