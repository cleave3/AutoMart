import Joi from '@hapi/joi';

const schemas = {
  user: Joi.object().keys({
    first_name: Joi.string().trim().min(3).max(30)
      .required(),
    last_name: Joi.string().trim().min(3).max(30)
      .required(),
    address: Joi.string().min(5).max(100).required(),
    email: Joi.string().email().trim().lowercase()
      .required(),
    password: Joi.string().trim().min(8).max(20)
      .required()
      .strict(),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required()
      .strict(),
    is_admin: Joi.boolean(),
  }),
  reset: Joi.object().keys({
    email: Joi.string().email().trim().lowercase()
      .required(),
    password: Joi.string().trim().min(8).max(20)
      .required()
      .strict(),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required()
      .strict(),
  }),
};

export default schemas;
