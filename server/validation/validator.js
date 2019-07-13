import Joi from '@hapi/joi';

const validate = (schema, property) => (req, res, next) => {
  const { error } = Joi.validate(req[property], schema);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
};
export default validate;
