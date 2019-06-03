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
  signin: Joi.object().keys({
    email: Joi.string().email().trim().lowercase()
      .required(),
    password: Joi.string().trim().min(8).max(20)
      .required()
      .strict(),
  }),
  car: Joi.object().keys({
    state: Joi.string().trim().valid('new', 'used').lowercase()
      .required(),
    status: Joi.string().trim().valid('available', 'sold').lowercase(),
    price: Joi.number().integer().required(),
    manufacturer: Joi.string().trim().required(),
    model: Joi.string().trim().required(),
    body_type: Joi.string().trim().required(),
    transmission_type: Joi.string().trim().valid('automatic', 'manual').lowercase()
      .required(),
    description: Joi.string(),
  }),
};

export default schemas;
