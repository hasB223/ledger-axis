export const errorMiddleware = (error, _req, res, _next) => {
  const mysqlStatus = error.code === 'ER_DUP_ENTRY' ? 409 : null;
  const status = error.status || mysqlStatus || 500;
  const message =
    error.code === 'ER_DUP_ENTRY'
      ? 'A record with the same unique value already exists'
      : status === 500
        ? 'Internal server error'
        : error.message;

  res.status(status).json({
    success: false,
    message
  });
};
