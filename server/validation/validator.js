import Joi from '@hapi/joi';

const validate = (schema, property) => (req, res, next) => {
  const validationOptions = {
    // allow unknown keys that will be ignored
    allowUnknown: true,
    // remove unknown keys from validation data
    stripUnknown: true,
  };
  const { error } = Joi.validate(req[property], schema, validationOptions);
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
