import createError from 'http-errors';

export const validate = (schema, target = 'body') => (req, _res, next) => {
  const { error, value } = schema.validate(req[target], {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return next(createError(400, error.details.map((detail) => detail.message).join(', ')));
  }

  req[target] = value;
  next();
};
