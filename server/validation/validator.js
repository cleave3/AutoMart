import Joi from '@hapi/joi';

const validate = (schema, property) => (req, res, next) => {
  const { error } = Joi.validate(req[property], schema);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    console.log(error.details[0]);
    return res.status(400).json(error.details[0].message);
  }
};
export default validate;
