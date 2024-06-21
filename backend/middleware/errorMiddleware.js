function handleUnauthorized(err, req, res, next) {
    if (err.status === 401) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next(err);
  }
  
  // Middleware function to handle not found errors
  function handleNotFound(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
  
  // Middleware function to handle all other errors
  function handleAllOtherErrors(err, req, res, next) {
    return res.status(err.status || 500).send({ message: 'Internal Server Error' });
  }
  
  module.exports= { handleAllOtherErrors,handleNotFound,handleUnauthorized };