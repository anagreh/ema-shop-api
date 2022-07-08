import { ErrorRequestHandler } from 'express';

export const endErrorHandler: ErrorRequestHandler = (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  if ('status' in err) {
    res.status(err.status || 500);
  } else {
    res.status(500);
  }

  console.error(err);
  res.send(res.locals.error);
};
