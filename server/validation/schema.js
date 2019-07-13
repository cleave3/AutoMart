import Joi from '@hapi/joi';

const schemas = {
  user: Joi.object().keys({
    first_name: Joi.string().trim().min(3).max(30)
      .required(),
    last_name: Joi.string().trim().min(3).max(30)
      .required(),
    address: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().trim().lowercase()
      .required(),
    password: Joi.string().trim().required(),
  }),
  signin: Joi.object().keys({
    email: Joi.string().email().trim().lowercase()
      .required(),
    password: Joi.string().trim()
      .required()
      .strict(),
  }),
  car: Joi.object().keys({
    state: Joi.string().trim().lowercase()
      .required(),
    status: Joi.string().trim().lowercase(),
    price: Joi.number().integer().required(),
    manufacturer: Joi.string().trim().required(),
    model: Joi.string().trim().required(),
    body_type: Joi.string().trim().required(),
    transmission_type: Joi.string().trim().lowercase(),
    description: Joi.string(),
  }),
};

export default schemas;
